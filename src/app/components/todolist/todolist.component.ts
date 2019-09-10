import { Component, OnInit } from '@angular/core';

// ```中文部分是使用 service + localStorage 把 app 数据存入 localStorage:
// a.Service: Service 是model, re-usable 数据.
// b.所有的 components 都可以调用 service; service 不可以调用 components;
//   不同的 services 之间可以调用; 父子 components 之间可以传值.
// c.angular 里的 service 是一个单例对象，在应用生命周期结束的时候（关闭浏览器）才会被清除
// 而 controllers 在不需要的时候就会被销毁了。

// 1.引入 StorageService:
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodoListComponent implements OnInit {

  public keyword: string = '';
  public todoList: any[] = [];

  // 2.声明 storage, 调用 service:
  constructor(public storage: StorageService) {
  }

  ngOnInit() {
    // 4.设置刷新页面时读取 localStorage 数据
    let localToDoList = this.storage.get('localToDoList');
    if (localToDoList) {
      this.todoList = localToDoList;
    }
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

        // 3.1 数据存入 localStorage
        // localStorage 数据有两部分组成, Key(是存入数据的名字), value(是存入数据的值)
        this.storage.set('localToDoList', this.todoList)
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

  updateItemStatus() {
    // 3.2 数据更新后存入 localStorage
    this.storage.set('localToDoList', this.todoList)
  }

  deleItem(key) {
    console.log(key)
    this.todoList.splice(key, 1)
    // 3.3 数据更新后存入 localStorage
    this.storage.set('localToDoList', this.todoList)

    // 注意: 设立,更新,删除 localStorage 数据全部都用 this.storage.set() 不能 this.storage.remove().
    // this.storage.remove('localToDoList') 会删除整个 key 为 'localToDoList' 的 localStorage 数据.
  }
}
