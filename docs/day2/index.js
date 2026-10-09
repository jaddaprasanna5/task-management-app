const employees = require('./employees.json');

const groupByDept = employees.reduce((acc,emp) => {
    const dept = emp.department;
    if(!acc[dept]){
        acc[dept] = [];
    }acc[dept].push(emp);
    return acc;
},{});
console.log(groupByDept);

const avgSalary = Object.entries(groupByDept).reduce((acc,[dept,emps]) =>{
    const total = emps.reduce((sum,e) => sum + e.salary,0);
    acc[dept] = Math.round(total/emps.length);
    return acc;
},{});
console.log(avgSalary);

const highestPaid = Object.entries(groupByDept).reduce((acc,[dept,emps]) => {
    const top = emps.reduce((max,e)=> e.salary > max.salary? e: max,emps[0]);
    acc[dept] =  top;
    return acc;
},{});
console.log(highestPaid);

const top5Paid = [...employees]
  .sort((a, b) => b.salary - a.salary)
  .slice(0, 5)
  .map(e => ({ name: e.name, department: e.department, salary: e.salary }));

console.log(top5Paid);