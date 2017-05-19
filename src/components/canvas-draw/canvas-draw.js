var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, Renderer } from '@angular/core';
import { Platform } from 'ionic-angular';
var CanvasDraw = (function () {
    function CanvasDraw(platform, renderer) {
        this.platform = platform;
        this.renderer = renderer;
        this.currentColour = '#1abc9c';
        this.brushSize = 10;
        console.log('Hello CanvasDraw Component');
        this.availableColours = [
            '#1abc9c',
            '#3498db',
            '#9b59b6',
            '#e67e22',
            '#e74c3c'
        ];
    }
    CanvasDraw.prototype.ngAfterViewInit = function () {
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
    };
    CanvasDraw.prototype.changeColour = function (colour) {
        this.currentColour = colour;
    };
    CanvasDraw.prototype.changeSize = function (size) {
        this.brushSize = size;
    };
    CanvasDraw.prototype.handleStart = function (ev) {
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    };
    CanvasDraw.prototype.handleMove = function (ev) {
        var ctx = this.canvasElement.getContext('2d');
        var currentX = ev.touches[0].pageX;
        var currentY = ev.touches[0].pageY;
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();
        this.lastX = currentX;
        this.lastY = currentY;
    };
    CanvasDraw.prototype.clearCanvas = function () {
        var ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    };
    return CanvasDraw;
}());
__decorate([
    ViewChild('myCanvas'),
    __metadata("design:type", Object)
], CanvasDraw.prototype, "canvas", void 0);
CanvasDraw = __decorate([
    Component({
        selector: 'canvas-draw',
        templateUrl: 'canvas-draw.html'
    }),
    __metadata("design:paramtypes", [Platform, Renderer])
], CanvasDraw);
export { CanvasDraw };
//# sourceMappingURL=canvas-draw.js.map