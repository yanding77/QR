const escpos = require('escpos');
const SerialPort = require('escpos-serialport');

const router = express.Router();

const device = new SerialPort('/'); //change this
const printer = new escpos.Printer(device);

const printBill = (billData) => {
    const { orderId, items, total } = billData;
  
    device.open((err) => {
      if (err) {
        console.error('Printer connection error:', err);
        return;
      }
  
      printer //change this:
        .align('ct') 
        .text('Restaurant Name') 
        .text('Address')
        .text('Phone Number')
        .text('======================')
        .text(`Order ID: ${orderId}`)
        .text('----------------------');
  
      items.forEach((item) => {
        printer.text(`${item.name} x${item.quantity} - $${item.price.toFixed(2)}`);
      });
  
      printer
        .text('----------------------')
        .text(`Total: $${total.toFixed(2)}`)
        .text('======================')
        .cut() // Cut the paper
        .close(); // Close the device
    });
  };
  
  module.exports = { printBill };