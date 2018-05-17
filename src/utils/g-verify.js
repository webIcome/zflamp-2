/**
 * Created by spring on 2018/4/8.
 */
export default class GVerify {
  constructor(options) {
    this.options = {
      id: '',
      canvasId: 'verifyCanvas',
      width: '100',
      height: '30',
      type: 'blend',
      point: false,
      code: '',
      line: 3
    };
    this.options = Object.assign(this.options, options);
    this.init()
  }

  init() {
    let con = document.getElementById(this.options.id);
    let canvas = document.createElement("canvas");
    this.options.width = con.offsetWidth > 0 ? con.offsetWidth : "100";
    this.options.height = con.offsetHeight > 0 ? con.offsetHeight : "30";
    canvas.id = this.options.canvasId;
    canvas.width = this.options.width;
    canvas.height = this.options.height;
    canvas.style.cursor = "pointer";
    canvas.innerHTML = "您的浏览器版本不支持canvas";
    con.appendChild(canvas);
  }

  refresh(code) {
    if (code) this.options.code=code;
    let  canvas = document.getElementById(this.options.canvasId);
    canvas.height = canvas.height;
    let ctx = canvas.getContext('2d');
    ctx.textBaseline = "middle";
    // ctx.fillStyle = this._randomColor(180, 240);
    // ctx.fillRect(0, 0, this.options.width, this.options.height);
    let txtArr = this.options.code.split('');

    for(var i = 0; i <txtArr.length; i++) {
      var txt = txtArr[i];
      this.options.code += txt;
      // ctx.font = this._randomNum(this.options.height/1.5, this.options.height) + 'px SimHei'; //随机生成字体大小
      ctx.font = '22px SimHei'; //随机生成字体大小
      // ctx.fillStyle = this._randomColor(50, 160); //随机生成字体颜色
      ctx.fillStyle = '#709ad5'; //随机生成字体颜色
      ctx.shadowOffsetX = this._randomNum(-3, 3);
      ctx.shadowOffsetY = this._randomNum(-3, 3);
      ctx.shadowBlur = this._randomNum(-3, 3);
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      var x = this.options.width / (txtArr.length) * i + this.options.width / (txtArr.length)/4;
      var y = this.options.height / 2;
      // var deg = this._randomNum(-30, 30);
      var deg = 0;
      /**设置旋转角度和坐标原点**/
      ctx.translate(x, y);
      ctx.rotate(deg * Math.PI / 180);
      ctx.fillText(txt, 0, 0);
      /**恢复旋转角度和坐标原点**/
      ctx.rotate(-deg * Math.PI / 180);
      ctx.translate(-x, -y);
    }
    /**绘制干扰线**/
    if (this.options.line) {
      for(var i = 0; i < this.options.line; i++) {
        ctx.strokeStyle = this._randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(this._randomNum(0, this.options.width), this._randomNum(0, this.options.height));
        ctx.lineTo(this._randomNum(0, this.options.width), this._randomNum(0, this.options.height));
        ctx.stroke();
      }
    }
    /**绘制干扰点**/
    if (this.options.point) {
      for(var i = 0; i < this.options.width/4; i++) {
        ctx.fillStyle = this._randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(this._randomNum(0, this.options.width), this._randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    }
  }

  _randomColor(min, max) {
    var r = this._randomNum(min, max);
    var g = this._randomNum(min, max);
    var b = this._randomNum(min, max);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  _randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
