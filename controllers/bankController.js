const Account = require("../model/account");
const getTokenInfo = require("../utils/token");

module.exports = {

  async createBankUser(req, res) {
    const token = req.headers.authorization.split(" ")[1];

    const tokenData = getTokenInfo(token);

    const account = new Account({
      username: tokenData.user,
      bankName: req.body.bankName,
      accountType: req.body.accountType,
      ownerName: tokenData.name,
      creditCardLimit: req.body.creditCardLimit,
    });

    Account.findOne(
      { username: tokenData.user, bankName: req.body.bankName },
      (error, bankAccount) => {
        if (error) {
          return res
            .status(500)
            .send({ output: "Ocorreu um erro ao localizar a conta do banco" });
        }
        if (bankAccount) {
          return res.status(400).send({
            output: `A conta do banco ${req.body.bankName} já foi cadastrada`,
          });
        }

        account
          .save()
          .then((success) => {
            res
              .status(201)
              .send({ output: `A conta foi cadastrada`, payload: success });
          })
          .catch((error) => {
            if (error && error.code === 11000) {
              res.status(400).send({
                output: `A conta do banco ${req.body.bankName} já foi cadastrada`,
              });

              return;
            }

            res.status(500).send({ output: "Ocorreu um erro e o cadastro não foi realizado" });
          });
      }
    );
  },

  async updateBankUser(req, res) {
    const token = req.headers.authorization.split(" ")[1];
    const tokenData = getTokenInfo(token);

    const bankNameRequest = req.body.bankName

    const user = tokenData.user;

    const accountUpdateBody = {
      bankName: req.body.bankName,
      accountType: req.body.accountType,
      creditCardLimit: req.body.creditCardLimit,
    };

    Account.findOneAndUpdate(
      { username: user, bankName: bankNameRequest },
      accountUpdateBody,
      { new: true },
      (error, data) => {

        if (error) {

          return res
            .status(500)
            .send({ output: "Ocorreu um erro ao localizar a conta" });
        }

        if (!data) {
          return res.status(403).send({ output: "A conta não foi localizada" });
        }

        return res.status(200).send(data);
      }
    );
  },

};
