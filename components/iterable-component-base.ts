import ComponentBase from "./component-base";

export default abstract class IterableComponentBase extends ComponentBase {
  public count = async () => this.body.count();

  public abstract getByText(text: string): ComponentBase;
  public abstract getByIndex(index: number): ComponentBase;

  protected getByTextBase<T extends ComponentBase>(text: string) {
    const component = this.create() as T;
    component.body = this.body.filter({ hasText: text });
    return component;
  }

  protected getByIndexBase<T extends ComponentBase>(index: number) {
    const component = this.create() as T;
    component.body = this.body.nth(index);
    return component;
  }

  protected abstract create(): ComponentBase;
}
