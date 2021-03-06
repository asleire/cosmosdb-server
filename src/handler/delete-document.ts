import * as http from "http";
import Account from "../account";

export default (
  account: Account,
  req: http.IncomingMessage,
  res: http.ServerResponse,
  {
    dbId,
    collId,
    docId
  }: {
    dbId: string;
    collId: string;
    docId: string;
  }
) => {
  const collection = account.database(dbId).collection(collId);
  const data = collection.document(docId).read();
  if (!data) {
    res.statusCode = 404;
    return {};
  }

  if (req.headers["if-match"] && req.headers["if-match"] !== data._etag) {
    res.statusCode = 412;
    return {
      code: "PreconditionFailed",
      message:
        "Operation cannot be performed because one of the specified precondition is not met."
    };
  }

  res.statusCode = 204;
  return collection.documents.delete(docId);
};
