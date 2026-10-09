let users = [];
let nextID = 1;

function createUser(name,email,isActive){
    if(!name || !email){
        throw new Error("Name and email required");
    }
    const user = {
        id:nextID++,
        name:name,
        email:email,
        isActive: isActive ?? true,
    };
    users.push(user);
    return user;
}

function getAllUsers(){
    return users;
}

function searchUser(email){
    const found = users.find((u) => u.email === email);
    if(!found){
        throw new Error(`User with ${email} not found`);
    }
    return found;
}

function getActiveUsers(){
    return users.filter((u) => u.isActive === true);
}

try {
  console.log(createUser("Prasanna", "prasu@test.com", true));
  console.log(createUser("Jadda", "jadda@test.com", false));
  console.log(createUser("Manian", "manian@test.com", true));
  console.log(getAllUsers());
  console.log(searchUser("prasu@test.com"));

  console.log(getActiveUsers()); 
  console.log(searchUser("wrong@test.com"));

} catch (e) {
  console.error("Error caught:", e.message);
}
