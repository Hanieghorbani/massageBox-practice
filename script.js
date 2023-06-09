let massage = document.getElementById("massage")
let numOfSms = document.getElementById("numOfSms")
let remainingChr = document.getElementById("remainingChr")
let btnSend = document.getElementById("btnSend")
let massagesBox = document.querySelector(".massagesBox")
let inputName = document.querySelector(".inputName")
let childArray = new Set()
massage.addEventListener("input", () => {
  let smsCount = parseInt(massage.value.length / 70 + 1)
  numOfSms.innerText = `(${smsCount} پیامک)`

  remainingChr.innerText = 70 * smsCount - massage.value.length
})

let blackList = ["کثافت", "عوضی", "بیشعور", "احمق"]

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

    generateHist(inputName.value, massage.value)
  } else {
    alert("لطفا متن پیامک یا نام گیرنده را وارد کنید")
    massage.value = ""
  }
})

massagesBox.addEventListener("click", (e) => {
  if (e.target.tagName == "H2") {
    e.target.classList.toggle("active")
  }
})

function generateHist(name, sms) {
  if (!massagesBox.innerHTML) {
    htmlHistory(name, sms)
  } else {
    for (const child of massagesBox.children) {
      childArray.add(child.children[0].innerText)
    }
    if (!childArray.has(inputName.value)) {
      htmlHistory(name, sms)
    } else {
      childArray.forEach((itemChild) => {
        if (itemChild == name) {
          for (const child of massagesBox.children) {
            if (child.firstElementChild.innerText == itemChild) {
              console.log(child)
              let newLi = document.createElement("li")
              newLi.innerText = sms
              child.lastElementChild.append(newLi)
            }
          }
        }
      })
    }
  }

  inputName.value = ""
  massage.value = ""
}

function htmlHistory(name, sms) {
  let tempOfAccordion = `<div class="accordionItem">
  <h2 class="recipientName">${name}</h2>
   <div class="historyOfMassages">
   <li class="histSMS">${sms}</li>
</div>
</div>`
  massagesBox.insertAdjacentHTML("beforeend", tempOfAccordion)
}

//

// if (inputName.value == childs.children[0].innerText) {
//   let newLi = document.createElement("li")
//   newLi.innerText = massage.value
//   childs.children[1].append(newLi)

//   massage.value = ""
//   inputName.value = ""
//   // console.log(childsArray);
//   return
// } else {
//   generateHist(inputName.value, massage.value)
//   return
// }
