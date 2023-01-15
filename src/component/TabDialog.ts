import { Container, Text, Sprite, Texture } from "pixi.js"

export class TabDialog extends Container {
  private tabs: {title: Text, content: Container}[];

  constructor() {
      super();
      this.tabs = [];

      const randomColor = Math.floor(Math.random() * 16777215);
      const bg = new Sprite(Texture.WHITE);
      bg.width = 200;
      bg.height = 200;
      bg.tint = randomColor;
      this.addChild(bg)
  }

  addTab(title: string, tab: Container): void {
      const tabTitle = new Text(title);
      tabTitle.interactive = true;
      tabTitle.on("pointertap", () => this.showTab(this.tabs.length));

      this.tabs.push({ title: tabTitle, content: tab });

      this.addChild(tabTitle);
      this.addChild(tab);

      //if (this.tabs.length === 1) {
          this.showTab(0);
      //}
  }

  showTab(index: number): void {
    if (index < 0 || index >= this.tabs.length) {
      return;
    }
    this.tabs.forEach(tab => {
        tab.content.visible = false;
    });
    this.tabs[index].content.visible = true;
  }
}
