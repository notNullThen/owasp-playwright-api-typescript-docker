import { Locator } from "@playwright/test";
import ComponentBase from "./component-base";
import IterableComponentBase from "./iterable-component-base";

export default abstract class TableBase extends ComponentBase {
  abstract rows: RowBase;
}

export abstract class RowBase extends IterableComponentBase {
  get cells() {
    return this.body.getByRole("cell");
  }

  async getByCellValue(cellText: string, cell: Locator) {
    const rowsCount = await this.count();
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
      const row = this.getByIndex(rowIndex);

      const cellValue = await cell.innerText();
      if (cellValue === cellText) {
        return row;
      }
    }

    throw new Error(`Row with cell text '${cellText}' not found`);
  }
}
