function currency(ammount: number) {
  return "$" + ammount.toLocaleString('en', { maximumFractionDigits: 2, minimumFractionDigits: 2 })
}

export default currency