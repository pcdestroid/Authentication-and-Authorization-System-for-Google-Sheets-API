const compras = SpreadsheetApp.openById('1Tkym48YeYnQFALTJENPzGEFSbq42ArSCA7Y389Vh77Q').getSheetByName('compras');
const users = SpreadsheetApp.openById('1Tkym48YeYnQFALTJENPzGEFSbq42ArSCA7Y389Vh77Q').getSheetByName('users');
const keys = ['1Ia1c2y4LpADh4rnTNQ']

function doPost(e) {
  let result = e.postData.getDataAsString();
  return ContentService.createTextOutput({ 'message': 'Ok' || 'empty' });
}

function run_function(texto, chave, email, hash) {
  if (keys.indexOf(chave) >= 0) {
    try {
      return this[texto](email, hash);
    }
    catch (e) {
      Logger.log(`${arguments.callee.name} => {e}`);
    }
  }
  else {
    console.log(`key ${chave} not authorized`)
    return 'App Not Authorized.'
  }
}

function login(email, hash) {

  let usersData = users.getDataRange().getValues();

  for (let i = 1; i < usersData.length; i++) {

    if (usersData[i][0] == email && hash == usersData[i][1]) {
      return { login: true };
    }
  }
  return { login: false };
}

function doGet(e) {
  let x = run_function(e.parameter.text, e.parameter.key, e.parameter.email, e.parameter.hash);
  let json = JSON.stringify(x);
  return ContentService.createTextOutput(json);
}
