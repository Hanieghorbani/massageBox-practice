let massage = document.getElementById("massage")
let numOfSms = document.getElementById("numOfSms")
let remainingChr = document.getElementById("remainingChr")
let btnSend = document.getElementById("btnSend")
let massagesBox = document.querySelector(".massagesBox")
let inputName = document.querySelector(".inputName")
let childArray = new Set()
let blackList = ["کثافت", "عوضی", "بیشعور", "احمق"]

getLocalStorage()
massage.addEventListener("keyup", (e) => {
  let smsCount = parseInt(massage.value.length / 70 + 1)
  numOfSms.innerText = `(${smsCount} پیامک)`
  remainingChr.innerText = 70 * smsCount - massage.value.length

  if (e.keyCode == 13 && massage.value.trim()) {
    inputName.focus()
  }
})

inputName.addEventListener("keyup", (e) => {
  if (e.keyCode == 13 && inputName.value.trim()) {
    sendSMS()
    inputName.blur()
  }
})
btnSend.addEventListener("click", sendSMS)

massagesBox.addEventListener("click", (e) => {
  if (e.target.tagName == "H2") {
    e.target.classList.toggle("active")
  }
})

function sendSMS() {
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
        childArray.add(child.children[1].innerText)
      }
      if (!childArray.has(inputName.value.trim())) {
        console.log('ham nam vogod ndrd');
        generateHist(inputName.value.trim(), massage.value)
      } else {
                console.log(111);
        childArray.forEach((itemChild) => {
          if (itemChild == inputName.value.trim()) {
            for (const child of massagesBox.children) {
              console.log(child.lastElementChild);
              if (child.firstElementChild.nextElementSibling.innerText == itemChild) {
                let newLi = document.createElement("li")
                newLi.setAttribute("class", "histSMS")
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
    massage.focus()
    setLocalStorage(massagesBox)
    removeAccor()
  } else {
    alert("لطفا متن پیامک یا نام گیرنده را وارد کنید")
  }
}

function generateHist(name, sms) {
  let tempOfAccordion = `<div class="accordionItem">
                          <span class="deleteAccor"></span>
                           <h2 class="recipientName">${name}</h2>
                           <div class="historyOfMassages">
                             <li class="histSMS">${sms}</li>
                           </div>
                         </div>`
  massagesBox.insertAdjacentHTML("beforeend", tempOfAccordion)
}

function setLocalStorage(massagesBox) {
  let htmlTempArray = []
  if (!massagesBox.innerHTML) {
    localStorage.setItem("history", JSON.stringify(htmlTempArray))
  }

  for (const child of massagesBox.children) {
    htmlTempArray.push(child.innerHTML)
    localStorage.setItem("history", JSON.stringify(htmlTempArray))
  }
}

function removeAccor() {
  for (const child of massagesBox.children) {
    child.addEventListener("click", (e) => {
      if (e.target.tagName == "SPAN") {
        e.target.parentElement.remove()

        setLocalStorage(massagesBox)
      }
    })
  }
}

function getLocalStorage() {
  let getHistory = JSON.parse(localStorage.getItem("history"))
  for (const item of getHistory) {
    let newAccor = document.createElement("div")
    newAccor.setAttribute("class", "accordionItem")
    newAccor.insertAdjacentHTML("beforeend", item)
    massagesBox.append(newAccor)
  }
  removeAccor()
}
