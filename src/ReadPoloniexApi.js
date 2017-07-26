export const readPoloniexApi = (coinObject) => {
  var fromCoin = coinObject.fromCoin
  var toCoin = coinObject.toCoin
  var value = coinObject.value
  if (toCoin !== "" && fromCoin !== "" && value !== "") { // check if the inputs are valid
    var poloResponse = coinObject.poloniexResponse
    if (fromCoin === "USD") fromCoin = "USDT"
    if (toCoin === "USD") toCoin = "USDT"
    var price = poloResponse[toCoin + "_" + fromCoin]
    if (price !== undefined) { // check if there is a direct conversion
      return price.last * value
      /*this.setState({
        newVal: price.last * value
      }) */
    } else { // try with inverse conversion
      price = poloResponse[fromCoin + "_" + toCoin]
      if (price !== undefined) {
        return value / price.last
        /* this.setState({
          newVal: value / price.last
        }) */
      } else { // convert through BTC
        var priceFromBtc = undefined
        var priceToBtc = undefined
        if (fromCoin !== "USDT") {
          priceFromBtc = poloResponse["BTC_" + fromCoin]
        } else {
          priceFromBtc = poloResponse["USDT_BTC"]
        }
        if (toCoin !== "USDT") {
          priceToBtc = poloResponse["BTC_" + toCoin]
        } else {
          priceToBtc = poloResponse["USDT_BTC"]
        }
        //alert("priceFromBtc" + priceFromBtc + "priceToBtc:" + priceToBtc)
        if (priceFromBtc !== undefined && priceToBtc !== undefined) {
          var fromBtc = (fromCoin === "USDT" ? 1 / priceFromBtc.last : priceFromBtc.last)
          var toBtc = (toCoin === "USDT" ? 1 / priceToBtc.last : priceToBtc.last)

          return fromBtc / toBtc * value
        } else {
          return "Poloniex does not contain data"
        }
      }
    }
  } else {
    return "Poloniex does not contain data"
  }
}
