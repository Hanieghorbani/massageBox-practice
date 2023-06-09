let massage = document.getElementById("massage")
let numOfSms = document.getElementById("numOfSms")
let remainingChr = document.getElementById("remainingChr")
let btnSend = document.getElementById("btnSend")
let massagesBox = document.querySelector(".massagesBox")
let inputName = document.querySelector(".inputName")
let childArray = new Set()
let blackList = ["کثافت", "عوضی", "بیشعور", "احمق"]

massage.addEventListener("input", () => {
  let smsCount = parseInt(massage.value.length / 70 + 1)
  numOfSms.innerText = `(${smsCount} پیامک)`
  remainingChr.innerText = 70 * smsCount - massage.value.length
})

btnSend.addEventListener("click", () => {
  if (massage.value.trim() && inputName.value.trim()) {
    let words = massage.value.split(" ")
    for (const blackWord of blackList) {
      if (words.includes(blackWord)) {
        alert("لطفا شخصیت خود را حفظ و از کلمات مناسب تر استفاده کنید.")
        return
      }
    }
    alert("پیامک شما ارسال شد .")

    if (!massagesBox.innerHTML) {
      generateHist(inputName.value.trim(), massage.value)
    } else {
      for (const child of massagesBox.children) {
        childArray.add(child.children[0].innerText)
      }
      if (!childArray.has(inputName.value.trim())) {
        generateHist(inputName.value.trim(), massage.value)
      } else {
        childArray.forEach((itemChild) => {
          if (itemChild == inputName.value.trim()) {
            for (const child of massagesBox.children) {
              if (child.firstElementChild.innerText == itemChild) {
                let newLi = document.createElement("li")
                newLi.innerText = massage.value
                child.lastElementChild.append(newLi)
              }
            }
          }
        })
      }
    }
 inputName.value = ""
  massage.value = ""
  } else {
    alert("لطفا متن پیامک یا نام گیرنده را وارد کنید")
  }
})

massagesBox.addEventListener("click", (e) => {
  if (e.target.tagName == "H2") {
    e.target.classList.toggle("active")
  }
})

function generateHist(name, sms) {
  let tempOfAccordion = `<div class="accordionItem">
                           <h2 class="recipientName">${name}</h2>
                           <div class="historyOfMassages">
                             <li class="histSMS">${sms}</li>
                           </div>
                         </div>`
  massagesBox.insertAdjacentHTML("beforeend", tempOfAccordion)
}