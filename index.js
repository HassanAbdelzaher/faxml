const soap = require('soap');

const url = 'service.wsdl';
const args = {
    "arg0": {
        "Request": {
            "SignonRq": {
                "ClientDt": "2010-09-27T00:06:47.445",
                "CustLangPref": "en-gb",
                "SuppressEcho": false,
                "SignonProfile": {
                    "Sender": "FAWRY",
                    "Receiver": "22",
                    "MsgCode": "BillInqRq",
                    "Version": "V1.0"
                }
            },
            "IsRetry": false,
            "PresSvcRq": {
                "RqUID": "cd166fb7-218e-4094-8d37-be42d3eb31b1",
                "AsyncRqUID": "321bb993-9158-4591-aed4-fe717786be33",
                "MsgRqHdr": {
                    "NetworkTrnInfo": {
                        "OriginatorCode": "FAWRYRTL",
                        "TerminalId": "10949"
                    }
                },
                "BillInqRq": {
                    "RecCtrlIn": {
                        "MaxRec": 0
                    },
                    "IncOpenAmt": true,
                    "BillingAcct": "0171000700",
                    "BankId": "FAWRYRTL",
                    "BillTypeCode": "319",
                    "DeliveryMethod": "POS"
                }
            }
        }
    }
}

const client = soap.createClient(url, { disableCache: true }, function (err, client) {
    if (err) {
        console.error(err);
        return;
    }


    client.setSecurity(new soap.ClientSSLSecurity(null, null, null, { rejectUnauthorized: false, strictSSL: false, secureOptions: require('constants').SSL_OP_NO_TLSv1_2 }));

    client.processRequest(args, function (err, result) {
        if (err) {
            console.error(err);
            return;
        }

        // Process the SOAP response here
        console.log(result.return.Response);
    });
});


// 