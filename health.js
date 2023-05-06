class HealthBar {
    constructor(x, y, w, h, maxHealth, color){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.maxHealth = maxHealth;
        this.maxWidth = w;
        this.health = maxHealth;
        this.color = color;
    }

    show(ctx) {
        ctx.strokeStyle = "#333";
        ctx.lineWidth = 8;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.strokeRect(this.x, this.y, this.maxWidth, this.h)
        ctx.fillStyle = "#000000";
        ctx.textAlign = "center";
        ctx.font = "bold 300% Poppins, sans-serif";
        ctx.fillText(`${health}`, 60, 50);
        ctx.fillText(`Очков   ${score}`, canvas.width / 2, 100);
    }

    updateHealth(val) {
        this.health = val;
        this.w = (this.health / this.maxHealth) * this.maxWidth;
    }

}
