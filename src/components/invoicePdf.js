import { jsPDF } from 'jspdf';

const printInvoice = (invoiceData) => {
  const doc = new jsPDF('p', 'mm', 'letter'),
    verticalOffset = 5,
    tableOffset = 10;

  const { clientName, date, clientAddress, listData, totalAmount } =
    invoiceData;

  doc.setFontSize(10);
  // Mucahit info
  doc
    .setFont(undefined, 'bold')
    .text('Mucahit Meat', verticalOffset + 150, 20, 'center')
    .setFont(undefined, 'normal');
  doc.text(
    '1 Brampton Court, 7 Union Road',
    verticalOffset + 150,
    25,
    'center'
  );
  doc.text('Romford', verticalOffset + 150, 30, 'center');
  doc.text('RM7 0GS', verticalOffset + 150, 35, 'center');
  doc.text('Tel: 07789996054', verticalOffset + 150, 40, 'center');
  doc.text('Company No: 13187166', verticalOffset + 150, 45, 'center');
  doc.text('VAT Number: 373543879', verticalOffset + 150, 50, 'center');

  // date
  doc
    .setFont(undefined, 'bold')
    .text('Date', verticalOffset + 20, 60)
    .setFont(undefined, 'normal');
  doc.text(date, verticalOffset + 20, 65);

  // bill to
  doc
    .setFont(undefined, 'bold')
    .text('Bill to: ', verticalOffset + 20, 72)
    .setFont(undefined, 'normal');
  doc.text(clientName, verticalOffset + 20, 77);
  doc
    .setFont(undefined, 'bold')
    .text('Address:', verticalOffset + 20, 84)
    .setFont(undefined, 'normal');
  doc.text(clientAddress.street, verticalOffset + 20, 89);
  doc.text(`${clientAddress.city}`, verticalOffset + 20, 94);
  doc.text(clientAddress.postCode, verticalOffset + 20, 99);

  // table

  doc
    .setFont(undefined, 'bold')
    .text('Weight', verticalOffset + tableOffset + 110, 110)
    .text('Price', verticalOffset + tableOffset + 130, 110)
    .text('Total', verticalOffset + tableOffset + 150, 110)
    .setFont(undefined, 'normal');

  listData.map((row, index) => {
    doc
      .text(row.product, verticalOffset + 20, 120 + index * 7)
      .text(
        `${row.amount} kg`,
        verticalOffset + tableOffset + 110,
        120 + index * 7
      )
      .text(
        `${row.price.toLocaleString('en-EN', {
          style: 'currency',
          currency: 'GBP',
        })}`,
        verticalOffset + tableOffset + 130,
        120 + index * 7
      )
      .text(
        `${row.total.toLocaleString('en-EN', {
          style: 'currency',
          currency: 'GBP',
        })}`,
        verticalOffset + tableOffset + 150,
        120 + index * 7
      );
  });

  // summary
  doc.text('Sub total', verticalOffset + 20, 180).text(
    `${totalAmount.toLocaleString('en-EN', {
      style: 'currency',
      currency: 'GBP',
    })}`,
    verticalOffset + tableOffset + 150,
    180
  );
  doc
    .text('Balance', verticalOffset + 20, 190)
    .text(`£      -`, verticalOffset + tableOffset + 150, 190);
  doc.text('Total', verticalOffset + 20, 200).text(
    `${totalAmount.toLocaleString('en-EN', {
      style: 'currency',
      currency: 'GBP',
    })}`,
    verticalOffset + tableOffset + 150,
    200
  );

  // footer

  doc
    .text('Make all cheques payable to:', verticalOffset + 20, 220)
    .text('Mucahit Meat Ltd.', verticalOffset + 20, 225);

  doc
    .setFont(undefined, 'bold')
    .text('Thank you for your business', verticalOffset + 20, 235);

  doc.save(`${clientName}-${date}.pdf`);
};

export default printInvoice;
