class ApiError extends Error{
        constructor(message){
            super(message);
            this.name = "Api Error";
            this.statusCode = 500;
        }        
}
class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = "Not Found Error";
        this.statusCode = 404;
    }
}
const usersDB = [{ id: 1, name: "Rahul" },
  { id: 2, name: "Priya" },
  { id: 3, name: "Aman" }
];

const ordersDB = [
  { id: 101, userId: 1, product: "Laptop", amount: 50000 },
  { id: 102, userId: 2, product: "Mouse", amount: 800 }
];

const projectsDB = [
  { id: 201, name: "Task Management App" },
  { id: 202, name: "E-commerce Site" }
];

function fakeApiCall(data,apiName){
    return new Promise((resolve,reject) => {
        const delay = Math.floor(Math.random() * 1500) + 500;
        const shouldFail = Math.random() < 0.3;

        setTimeout(() => {
            if(shouldFail){
                reject(new ApiError(`${apiName} failed due to network`));
            }else{
                resolve(data);
            }
        },delay)
    });
}

function getUsers(){
    console.log("Gettinng users......")
    return fakeApiCall(usersDB,"getUsers");
}

function getOrders(){
    console.log("Getting Orders........")
    return fakeApiCall(ordersDB,"getOrders");
}

function getProjects(){
    console.log("Getting Projects......")
    return fakeApiCall(projectsDB,"getProjects");
}

function getUserById(id){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            const user = usersDB.find(u => u.id === id);
            if(!user){
                reject(new NotFoundError(`user with id ${id} not found `));
            }else{
                resolve(user);
            }
        },800);
    });
}

async function withRetry(fn,retries = 3){
    for(let i = 1;i<retries;i++){
        try{
            console.log(`Attempt${i} for ${fn.name}`);
            const data = await fn();
            return data;
        }catch(e){
            console.log(`Attempt${i} failed: ${e.message}`);
            if(i === retries) throw e;
            await new Promise(r => setTimeout(r,500));
        }
    }
}


async function main(){
    try{
        const user = await withRetry(getUsers,3);
        console.log(user);
    }catch(e){
        console.log("User failed: " + e.message);
    }
     try{
        const orders = await withRetry(getOrders,3);
        console.log(orders);
    }catch(e){
        console.log("orders failed: " + e.message);
    }
     try{
        const Projects = await withRetry(getProjects,3);
        console.log(Projects);
    }catch(e){
        console.log("Projects failed: " + e.message);
    }
     try{
        const user = await getUserById(1);
        console.log(user);
    }catch(e){
        console.log(e.message);
    }
    try {
    await getUserById(99);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}
main();


