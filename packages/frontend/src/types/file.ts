export default interface File {
  id: string;
  url: string;
  fileKind: string;
  fileType: string; // todo: enum?
  createdAt: string;
  updatedAt: string;
}
