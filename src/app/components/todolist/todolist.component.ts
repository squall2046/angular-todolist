import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodoListComponent implements OnInit {

  public keyword: string = '';
  public todoList: any[] = [];

  constructor() { }

  ngOnInit() {
  }

  keyUpEvent(event) {
    if (this.keyword.length > 0 && event.keyCode === 13) {
      // if checkUnique is true:
      if (this.checkUnique(this.todoList, this.keyword)) {
        this.todoList.push(
          {
            title: this.keyword,
            // status false means item is in todoList, true means item is in finished.
            status: false
          }
        )
        this.keyword = '';
      }
      else { alert("The input has existed.") }
    }
    // console.log(event)
    // console.log(this.keyword)
  }


  // Assume the keyword is unique in todoList and return true,
  // Then check every existed title in todoList,
  // Only if any title in todoList is as same as keyword, return false.
  checkUnique(todoList: any, keyword: any) {
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].title == keyword) {
        return false;
      };
    }
    return true;
  }

  deleItem(key) {
    this.todoList.splice(key, 1)
  }

}
