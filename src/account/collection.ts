/* eslint-disable class-methods-use-this, no-underscore-dangle, no-use-before-define */
import ItemObject from "./item-object";
import Item from "./item";
import Documents from "./documents";
import PartitionKeyRanges from "./partition-key-ranges";
import UserDefinedFunctions from "./user-defined-functions";

export default class Collection extends Item {
  documents: Documents;

  partitionKeyRanges: PartitionKeyRanges;

  userDefinedFunctions: UserDefinedFunctions;

  constructor(data: ItemObject | undefined | null) {
    super(data);
    this.documents = new Documents(this);
    this.partitionKeyRanges = new PartitionKeyRanges(this);
    this.userDefinedFunctions = new UserDefinedFunctions(this);

    if (data) {
      this.partitionKeyRanges.create({
        id: 0,
        minInclusive: "",
        maxExclusive: "FF",
        ridPrefix: 0,
        throughputFraction: 1,
        status: "online",
        parents: []
      });
    }
  }

  document(idOrRid: string) {
    return this.documents._item(idOrRid);
  }

  userDefinedFunction(idOrRid: string) {
    return this.userDefinedFunctions._item(idOrRid);
  }
}
