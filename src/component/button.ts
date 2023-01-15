import { Container, Text, TextStyle, Sprite, Texture } from "pixi.js"

const NORMAL = 0x00EE00;
const OVER = 0x00FF00;
//const DOWN = 0x0000FF;

export class button {
  container: Container;
  label: Text;

  constructor(label: string, x: number, y: number, width: number, height: number) {
    // Store the button's label, width, and height
    this.label = new Text(label);

    // Create a new container to hold the button
    this.container = new Container();

    // Set the container's position and size
    this.container.x = x;
    this.container.y = y;
    this.container.width = width;
    this.container.height = height;
    this.container.interactive = true;
    //this.container.buttonMode = true;

    // Set the container's background color
    const bg = new Sprite(Texture.WHITE);
    bg.width = width;
    bg.height = height;
    bg.tint = NORMAL;
    this.container.addChild(bg)

    // Set the label text's position and style
    this.label.x = 1;
    this.label.y = 1;
    this.label.style = new TextStyle({
        fontSize: 36,
        fontWeight: "bold"
    });

    // Add the label text to the button container
    this.container.addChild(this.label);

    this.container.on("pointerover", function() {
      bg.tint = OVER;
    });
    this.container.on("pointerout", function() {
      bg.tint = NORMAL;
    });
  }
}
