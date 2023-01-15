import { settings, SCALE_MODES, Application, Sprite, utils, Text, TextStyle, Container, Texture } from 'pixi.js' //, Graphics
import { dialog } from './component/dialog'
import { TabDialog } from './component/TabDialog'
//import * as Pixi from 'pixi.js'

// Use the native window resolution as the default resolution
// will support high-density displays when rendering
settings.RESOLUTION = window.devicePixelRatio;

// Disable interpolation when scaling, will make texture be pixelated
settings.SCALE_MODE = SCALE_MODES.LINEAR //NEAREST;

let w = window.innerWidth;
let h = window.innerHeight;
let scale = window.devicePixelRatio || 1
console.log(utils.isMobile.any)
if(utils.isMobile.any) {
	scale = 1
}
console.log(scale)

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: scale,
	antialias: true,
	autoDensity: true,
  backgroundAlpha: 0,
	backgroundColor: 0x0000FF,
	width: w,
	height: h,
	resizeTo: window
});

const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

//const enlargedHeight = Math.floor(h);
//app.view.style.height = `${enlargedHeight}px`

app.stage.addChild(clampy);

// Create a new text object
const textStyle = new TextStyle({
	fill: 0xFFFFFF,
	fontSize:40
});
	
const text = new Text("Click here to open the dialog window", textStyle);

// Set the text object's interactive property to true
text.interactive = true;
//text.buttonMode = true;

// Add the text object to the stage
app.stage.addChild(text);

// Add a click event listener to the text object
text.on("pointerdown", function() {
    // Open the dialog window here
		const dialog1 = new dialog(app)
		dialog1.show()
});

const tabDialog = new TabDialog();
tabDialog.x = 200
tabDialog.y = 200
tabDialog.width = 200
tabDialog.height = 200
tabDialog.visible = true;
tabDialog.zIndex = 1;

const randomColor = Math.floor(Math.random() * 16777215);
const bg = new Sprite(Texture.WHITE);
bg.width = 200;
bg.height = 200;
bg.tint = randomColor;

// Create some tabs and add them to the dialog
const tab1 = new Container();
tab1.addChild(bg)
tab1.addChild(new Text("Tab 1 Content"));
tabDialog.addTab("Tab 1", tab1);

const tab2 = new Container();
tab2.addChild(new Text("Tab 2 Content"));
tabDialog.addTab("Tab 2", tab2);

// Add the tabs to the stage
app.stage.addChild(tabDialog);

/* var ws = new WebSocket("ws://92.220.168.140:8080/echo");

ws.onopen = function(_evt) {
  console.log("OPEN");
  ws.send("{\"w\":"+w+",\"h\":"+h+", \"scale\":"+1.0+"}");
}
ws.onclose = function(_evt) {
  console.log("CLOSE");
  ws.close;
}
ws.onmessage = function(evt) {
  const tt = JSON.parse(evt.data)
  if(tt.TYPE == "rect") {
    const arr = tt.VALUE.split(',').map((element: any) => {
      return Number(element);
    });
    rect(arr[0], arr[1], arr[2], arr[3])
  }
}
ws.onerror = function(evt) {
  console.log("ERROR: "+evt)
}

function rect(x: number, y: number, w: number, h: number) {  
  // Create a Graphics object, set a fill color, draw a rectangle
  let obj = new Graphics();
  let col = Math.floor(Math.random() * 3);
  if(col == 0) {
    obj.beginFill(0xFF0000);
  } else if(col == 1) {
    obj.beginFill(0x00FF00);
  } else {
    obj.beginFill(0x0000FF);
  }
  
  obj.drawRect(x, y, w, h);
  // app.stage.addChild(obj);
} */