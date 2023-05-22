let massage = document.getElementById("massage")
let numOfSms = document.getElementById("numOfSms")
let remainingChr = document.getElementById("remainingChr")
let btnSend = document.getElementById("btnSend")

massage.addEventListener("input", () => {
  let smsCount = parseInt(massage.value.length / 70 + 1)
  numOfSms.innerText = `(${smsCount} پیامک)`

  remainingChr.innerText = 70 * smsCount - massage.value.length
})

let blackList = ["عوضی", "بیشعور", "احمق"]

btnSend.addEventListener("click", () => {
  let words = massage.value.split(" ")

  for (const blackWord of blackList) {
    if (words.includes(blackWord)) {
      alert("لطفا شخصیت خود را حفظ و از کلمات مناسب تر استفاده کنید.")
    }
  }

  alert('پیامک شما ارسال شد .')
})
