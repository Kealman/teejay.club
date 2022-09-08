import { makeAutoObservable } from "mobx";

class CommentsState {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  public commentToReply = 0;
  public hiddenChilds: number[] = [];

  handleClickReplyButton(commentId: number) {
    this.commentToReply = commentId;
  }

  toggleShowChilds(parentId: number) {
    if (this.hiddenChilds.indexOf(parentId) == -1) {
      this.hiddenChilds.push(parentId);
    } else {
      this.hiddenChilds = this.hiddenChilds.filter((id) => id != parentId);
    }
  }

  isChildHidden(id: number) {
    return this.hiddenChilds.indexOf(id) != -1;
  }
}

export default CommentsState;
