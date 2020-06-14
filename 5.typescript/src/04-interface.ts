// 接口 约束结构，类似于type
interface Person {
  firstName: string;
  lastName: string;
}

interface Student extends Person {
  studentNo: '95000000000000'
}

// greeting函数通过Person接口约束参数结构
function greeting (person: Person): string {
  return "Hello, " + person.firstName + " " + person.lastName;
}

greeting({ firstName: "Jane", lastName: "User" });