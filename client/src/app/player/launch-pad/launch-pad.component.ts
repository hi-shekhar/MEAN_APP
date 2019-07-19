import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
// import { StoreDataService } from '../../common-service/store-data.service';

@Component({
  selector: 'app-launch-pad',
  templateUrl: './launch-pad.component.html',
  styleUrls: ['./launch-pad.component.scss']
})
export class LaunchPadComponent implements OnInit, AfterViewInit {

  public userName: string;
  // a reference to the canvas element from our template
  @ViewChild('breakoutCanvas') public breakoutCanvas: ElementRef;
  //  ctx letiable to store the 2D rendering context — the actual tool we can use to paint on the Canvas.
  private ctx: CanvasRenderingContext2D;
  public startGame: any;
  public endGame: any;
  // setting a width and height for the canvas
  @Input() public width = 480;

  @Input() public height = 400;
  public canvasEl: HTMLCanvasElement;
  public ballXPosition: number;
  public ballYPosition: number;
  public ballRadius = 10;
  // move that ball will made after each interval
  public nextXMove = 2;
  public nextYMove = -2;
  // paddle
  public paddleHeight = 10;
  public paddleWidth = 75;
  public paddleX = (this.width - this.paddleWidth) / 2;
  public rightPressed = false;
  public leftPressed = false;
  // bricks
  public brickRowCount = 3;
  public brickColumnCount = 5;
  public brickWidth = 75;
  public brickHeight = 20;
  public brickPadding = 10;
  public brickOffsetTop = 30;
  public brickOffsetLeft = 30;
  public bricks = [];
  // score
  public score = 0;
  // lives
  public lives = 3;
  constructor(public router: Router) { }

  public ngOnInit(): void {
    const user = localStorage.getItem('user');
    console.log(user);
    // this.userName = JSON.parse(user).FirstName;

    for (let c = 0; c < this.brickColumnCount; c++) {
      this.bricks[c] = [];
      for (let r = 0; r < this.brickRowCount; r++) {
        this.bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed ${ev.key}!`);
    if (ev.keyCode === 39) {
      this.rightPressed = false;
    } else if (ev.keyCode === 37) {
      this.leftPressed = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(ev: KeyboardEvent) {
    // do something meaningful with it
    console.log(`The user just pressed ${ev.key}!`);
    if (ev.keyCode === 39) {
      this.rightPressed = true;
    } else if (ev.keyCode === 37) {
      this.leftPressed = true;
    }
  }

  // @HostListener('document:mousemove', ['$event'])
  mouseMoveHandler(e) {
    const relativeX = e.clientX - this.canvasEl.offsetLeft;
    if (relativeX > 0 && relativeX < this.width) {
      this.paddleX = relativeX - this.paddleWidth / 2;
    }
  }

  public ngAfterViewInit(): void {
    // get the context
    this.canvasEl = this.breakoutCanvas.nativeElement;
    this.ctx = this.canvasEl.getContext('2d');

    // set the width and height
    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;
    this.ballXPosition = this.canvasEl.width / 2;
    this.ballYPosition = this.canvasEl.height - 30;
    this.startGame = setInterval(() => { this.draw(); }, 10);
  }

  public draw() {
    // delete ball
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawBricks();
    this.drawBall();
    this.drawPaddle();
    this.drawScore();
    this.drawLives();
    this.collisionDetection();

    if ((this.ballXPosition + this.nextXMove) < this.ballRadius || (this.ballXPosition + this.nextXMove) > this.width - this.ballRadius) {
      this.nextXMove = -this.nextXMove;
    }

    if ((this.ballYPosition + this.nextYMove) < this.ballRadius) {
      this.nextYMove = -this.nextYMove;
    } else if ((this.ballYPosition + this.nextYMove) > this.height - this.ballRadius) {
      // alert('GAME OVER');
      // this.router.navigateByUrl('/profile', { skipLocationChange: true }).then(() =>
      //   this.router.navigate(['home']));
      if (this.ballXPosition > this.paddleX && this.ballXPosition < this.paddleX + this.paddleWidth) {
        this.nextYMove = -this.nextYMove;
      } else {
        this.lives--;
        if (!this.lives) {
          clearInterval(this.startGame);
          console.log('Game Over ---- live end');
        } else {
          this.ballXPosition = this.width / 2;
          this.ballYPosition = this.height - 30;
          this.nextXMove = 2;
          this.nextYMove = -2;
          this.paddleX = (this.width - this.paddleWidth) / 2;
        }
      }
    }




    if (this.rightPressed && this.paddleX < this.width - this.paddleWidth) {
      this.paddleX += 2;
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 2;
    }
    // update ballposition
    this.ballXPosition += this.nextXMove;
    this.ballYPosition += this.nextYMove;
    // console.log(this.ballYPosition);
  }

  /**
   * Draw ball
   */
  public drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.ballXPosition, this.ballYPosition, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
    this.ctx.closePath();
  }

  /**
   * Draw paddle
   */

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = 'blue';
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawBricks() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        if (this.bricks[c][r].status === 1) {
          const brickX = (c * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
          const brickY = (r * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
          this.bricks[c][r].x = brickX;
          this.bricks[c][r].y = brickY;
          this.ctx.beginPath();
          this.ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);
          this.ctx.fillStyle = '#0095DD';
          this.ctx.fill();
          this.ctx.closePath();
        }
      }
    }
  }

  collisionDetection() {
    for (let c = 0; c < this.brickColumnCount; c++) {
      for (let r = 0; r < this.brickRowCount; r++) {
        const b = this.bricks[c][r];
        if (b.status === 1) {
          if (this.ballXPosition > b.x &&
            this.ballXPosition < b.x + this.brickWidth &&
            this.ballYPosition > b.y &&
            this.ballYPosition < b.y + this.brickHeight) {
            this.nextYMove = -this.nextYMove;
            b.status = 0;
            this.score++;
            if (this.score === this.brickRowCount * this.brickColumnCount) {
              console.log('YOU WIN, CONGRATULATIONS!');
              //  document.location.reload();
            }
          }
        }
      }
    }
  }

  drawScore() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fillText('Score: ' + this.score, 8, 20);
  }

  drawLives() {
    this.ctx.font = '16px Arial';
    this.ctx.fillStyle = '#0095DD';
    this.ctx.fillText('Lives: ' + this.lives, this.width - 65, 20);
  }

}
