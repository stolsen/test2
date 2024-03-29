import { Application, Container, Text, TextStyle, Sprite, Texture } from "pixi.js"
import { button } from "./button"

export class dialog {
  dialogContainer: Container = new Container
  data: any
  xdiff: number = 0

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

    const closeBut = new button("Lukk", dialogContainer.width - 120, dialogContainer.height - 50, 110, 40)

    dialogContainer.addChild(closeBut.container)

    closeBut.container.on("click", function() {
      // Open the dialog window here
      dialogContainer.visible = false
    });

    const onDragMove = (event: any) => {
      if (dragTarget) {
          event.global.x = event.global.x - this.xdiff
          dragTarget.parent.toLocal(event.global, null, dragTarget.position);
      }
    }

    const onDragStart = (event: any) => {
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        // this.data = event.data;
        dialogContainer.alpha = 0.5;
        dragTarget = dialogContainer
        this.xdiff = Math.abs(event.global.x - dragTarget.position._x)
        app.stage.on('pointermove', onDragMove);
    }

    function onDragEnd() {
        if (dragTarget) {
            app.stage.off('pointermove', onDragMove);
            dragTarget.alpha = 1;
            dragTarget = null;
        }
    }

    dialogContainer.interactive = true;
    //top.buttonMode = true;
    top.interactive = true;
    top.cursor = 'pointer'
    top.on("pointerdown", onDragStart, top)

    let dragTarget: any = null;
    app.stage.interactive = true;
    app.stage.hitArea = app.screen;
    app.stage.on('pointerup', onDragEnd);
    app.stage.on('pointerupoutside', onDragEnd);
  }

  show() {
    this.dialogContainer.visible = true
  }
}