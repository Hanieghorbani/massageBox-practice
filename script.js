let massage = document.getElementById("massage")
let numOfSms = document.getElementById("numOfSms")
let remainingChr = document.getElementById("remainingChr")
let btnSend = document.getElementById("btnSend")
let massagesBox = document.querySelector(".massagesBox")
let inputName = document.querySelector(".inputName")
let childArray = new Set()
let blackList = ["کثافت", "عوضی", "بیشعور", "احمق"]

let date
let hours
let minutes

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
  if (massagesBox.firstElementChild.tagName == "P") {
    massagesBox.innerHTML = ""
  }
  date = new Date()
  hours = date.getHours()
  minutes = date.getMinutes()

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
      generateHist(inputName.value.trim(), massage.value, `${hours}:${minutes}`)
    } else {
      for (const child of massagesBox.children) {
        childArray.add(child.children[1].innerText)
      }
      if (!childArray.has(inputName.value.trim())) {
        generateHist(
          inputName.value.trim(),
          massage.value,
          `${hours}:${minutes}`
        )
      } else {
        childArray.forEach((itemChild) => {
          if (itemChild == inputName.value.trim()) {
            for (const child of massagesBox.children) {
              console.log(child.lastElementChild)
              if (
                child.firstElementChild.nextElementSibling.innerText ==
                itemChild
              ) {
                let newLi = document.createElement("li")
                let newP = document.createElement("p")
                newP.innerText = `${hours}:${minutes}`
                newLi.setAttribute("class", "histSMS")
                newLi.innerText = massage.value
                child.lastElementChild.append(newLi)
                newLi.append(newP)
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

function generateHist(name, sms, time) {
  let tempOfAccordion = `<div class="accordionItem">
                          <span class="deleteAccor"></span>
                           <h2 class="recipientName">${name}</h2>
                           <div class="historyOfMassages">
                             <li class="histSMS">${sms}<p>${time}</p></li>
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
        if (!massagesBox.innerHTML) {
          notifTxt()
        }
      }
    })
  }
}

function getLocalStorage() {
  let getHistory = JSON.parse(localStorage.getItem("history"))
  if (!getHistory) {
    getHistory = []
  } 
  if (getHistory.length == 0) {
    notifTxt()
  } else {
    for (const item of getHistory) {
      console.log(111)
      let newAccor = document.createElement("div")
      newAccor.setAttribute("class", "accordionItem")
      newAccor.insertAdjacentHTML("beforeend", item)
      massagesBox.append(newAccor)
      removeAccor()
    }
  }
}

function notifTxt() {
  let newP = document.createElement("p")
  newP.setAttribute("class", "notifText")
  newP.innerText = `هنوز هیچ پیامی ارسال نشده است`
  massagesBox.append(newP)
}
