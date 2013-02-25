function HtmlTableCells(id, rows, cols, htmlZero, htmlOne) {
    // attributes
    this.currChar = null;
    this.tableRoot = document.getElementById(id);
    this.htmlImgZero = htmlZero;
    this.htmlImgOne = htmlOne;

    //"constructor"

    var row, cell;
    for (var i = 0; i < rows; i++) {
        row = this.tableRoot.insertRow(-1);
        for (var j = 0; j < cols; j++) {
            cell = row.insertCell(-1);
            cell.innerHTML = htmlZero;
        }
    }

    // methods
    this.displayCharAt = function (char, index) {

        var addColumn = function (index, htmlTable) {

//            var
//                tblHeadObj = htmlTable.tableRoot.tHead,
//                HeadRow,
//                newHeadCell;
//
//            if (tblHeadObj == null || tblHeadObj == "undefined" ) {
//                tblHeadObj = htmlTable.tableRoot.appendChild(document.createElement('thead'));
//            }
//            if (tblHeadObj.rows.length == 0) {
//                HeadRow = tblHeadObj.insertRow(-1);
//            } else {
//                HeadRow = tblHeadObj.rows[0];
//            }
//
//            newHeadCell = HeadRow.insertCell(index);
//            newHeadCell.innerHTML = 'Char=' + htmlTable.currChar.char;

//            if (tblHeadObj != null) {
//                for (var h = 0; h < tblHeadObj.rows.length; h++) {
//                    var newTH = document.createElement('th');
//                    tblHeadObj.rows[h].appendChild(newTH);
//                    newTH.innerHTML = '[th] row:' + h + ', cell: ' + (tblHeadObj.rows[h].cells.length - 1) + '. Char=' + htmlTable.currChar;
//                }
//            }

            var tblBodyObj = htmlTable.tableRoot.tBodies[0];
            if (tblBodyObj == null) {
                tblBodyObj = htmlTable.tableRoot.appendChild(document.createElement('tbody'));
            }
            var
                bitCode = htmlTable.currChar.ToBinary(),
            //tabRows = new Array(tblBodyObj.rows.length);
                tabRows = tblBodyObj.rows;

            var curBit = 0,
                tabRowsInitialCnt = tabRows.length,
                newCell = null;

            for (var i = 0; i < tabRowsInitialCnt; i++) {
                var cellsCnt = tabRows[i].cells.length;
                if (cellsCnt > (index + 1)) {
                    for (var j = cellsCnt - 1; j > index; j--) {
                        tabRows[i].deleteCell(j);
                    }
                    newCell = tabRows[i].cells[index]
                } else if (cellsCnt == (index + 1)) { // если ячейка с этим индексом существует
                    newCell = tabRows[i].cells[index]; // ссылаемся на нее
                } else {
                    newCell = tabRows[i].insertCell(-1);// иначе добавляем новую ячейку в эту строку
                }
                curBit = bitCode.charAt(i);
                newCell.innerHTML = curBit == '1' ? htmlTable.htmlImgOne : htmlTable.htmlImgZero;
            }
            if (tabRowsInitialCnt < htmlTable.currChar.charCodeLen) {
                for (var i = tabRowsInitialCnt; i < htmlTable.currChar.charCodeLen; i++) {
                    var newRow = htmlTable.tableRoot.insertRow(-1);
                    for (var j = 0; j < index; j++) {
                        newCell = newRow.insertCell(j);
                        newCell.innerHTML = htmlTable.htmlImgZero;;
                    }
                    newCell = newRow.insertCell(index);
                    curBit = bitCode.charAt(i);
                    newCell.innerHTML = curBit == '1' ? htmlTable.htmlImgOne : htmlTable.htmlImgZero;
                }
            }

        };

        this.currChar = new AnyChar(char);
        addColumn(index, this);

        this.getCurrChar = function () {
            return this.currChar;
        }
    }

};

function AnyChar(c) {
    this.char = c;
    this.charCode = null;
    this.charCodeLen = null;
    if (c!=null) {
        this.charCode = this.char.charCodeAt(0);
    }

    if (c != null && c.length > 0) {
        if (this.charCode >= -128 && this.charCode <= 127) {
            this.charCodeLen = 8;
        } else {
            this.charCodeLen = 32;
        }
    } else {
        this.charCodeLen = 0;
    }


    this.ToBinary = function () {
        var
            bit = "", n = parseInt(this.charCode),
            mask;

        if (this.charCodeLen <= 8) {
            mask = 0x80;
        }
        else {
            mask = 0x80000000;
        }
        for (var i = 0 ; i < this.charCodeLen; i++, n <<= 1)
            bit += n & mask ? '1' : '0';
        return bit;
    }

}