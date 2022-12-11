import { Application, Container, Text, TextStyle, Sprite, Texture } from "pixi.js"

export class dialog {
  dialogContainer: Container = new Container
  data: any
  xdiff: number = 0
  ydiff: number = 99

  constructor(app: Application) {
    
    const dialogContainer = this.dialogContainer
    
    dialogContainer.x = 100 + Math.floor(Math.random() * 100)
    dialogContainer.y = 100 + Math.floor(Math.random() * 100)
    dialogContainer.width = 600
    dialogContainer.height = 400
    dialogContainer.visible = false

    app.stage.addChild(dialogContainer)

    // Create a new text object to display the dialog's title
    const titleText = new Text("Dialog Title");

    // Set the title text's position and style
    titleText.x = 20;
    titleText.y = 25;
    titleText.style = new TextStyle({
      fontSize: 24,
      fontWeight: "bold"
    });

    const randomColor = Math.floor(Math.random() * 16777215);
    const bg = new Sprite(Texture.WHITE);
    bg.width = 600;
    bg.height = 400;
    bg.tint = randomColor; //0xff0000

    dialogContainer.addChild(bg)

    const top = new Sprite(Texture.WHITE);
    top.width = 600;
    top.height = 20;
    top.tint = 0xffffff;

    dialogContainer.addChild(top)

    // Add the title text to the dialog container
    dialogContainer.addChild(titleText);

    // Create a new text object to display the dialog's message
    const messageText = new Text("This is the dialog message");

    // Set the message text's position and style
    messageText.x = 20;
    messageText.y = 60;
    messageText.style = new TextStyle({
      fontSize: 16
    });

    // Add the message text to the dialog container
    dialogContainer.addChild(messageText);

    // Create a new button to close the dialog
    const closeButton = new Text("Close");

    // Set the button's position and style
    closeButton.x = dialogContainer.width - 120;
    closeButton.y = dialogContainer.height - 50;
    closeButton.style = new TextStyle({
      fontSize: 40
    });

    // Set the button's interactive property to true
    closeButton.interactive = true;
    closeButton.buttonMode = true;

    // Add the button to the dialog container
    dialogContainer.addChild(closeButton);

    // Add a click event listener to the button
    closeButton.on("pointerdown", function() {
      // Close the dialog here
      dialogContainer.visible = false
    });

    dialogContainer.interactive = true;
    //dialogContainer.buttonMode = true;
    top.buttonMode = true;
    top.interactive = true;

    // setup events for mouse + touch using
    // the pointer events
    this.dialogContainer
      .on("pointerdown", (event) => {
        this.data = event.data
        let obj = event.currentTarget
        let newPosition = this.data.getLocalPosition(obj.parent)
        this.xdiff = Math.abs(this.dialogContainer.x - newPosition.x)
        this.ydiff = Math.abs(this.dialogContainer.y - newPosition.y)
      })
      .on("pointerup", () => {
        this.data = null
      })
      .on("pointerupoutside", () => {
        this.data = null
      })
      .on("pointermove", (event) => {
        let obj = event.currentTarget
        if (this.data != null && this.ydiff < 20) {
          let newPosition = this.data.getLocalPosition(obj.parent)
          this.dialogContainer.x = newPosition.x-this.xdiff
          this.dialogContainer.y = newPosition.y
        }
      })
  }

  show() {
    this.dialogContainer.visible = true
  }
}