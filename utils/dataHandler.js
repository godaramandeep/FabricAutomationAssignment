const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../testData/customerData.json');


function initDataFile() {
  if (!fs.existsSync(filePath)) {
    const initialData = { customerData: {} };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
  }
}

function addCustomerData(id,value) {
  initDataFile();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  data.customerData[id] = value;
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function getCustomerData(id) {
  initDataFile();
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return id ? data.customerData[id] : data.customerData;
}

module.exports = { getCustomerData, addCustomerData };
