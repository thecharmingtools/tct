/*!
* Start Bootstrap - Creative v7.0.5 (https://startbootstrap.com/theme/creative)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {
    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY <= 200) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', () => {
        navbarShrink()
    });

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
    

    if(window.location.search.includes("subscribed")) {
        let alert = document.getElementById("subscribed-alert")
        alert.style.display = "block";

        let alertBackground = document.getElementById("subscribed-alert-background")
        alertBackground.style.display = "block";
        plausible('Newsletter-Subscribed')
    }
});

function changeMobileMenuVisibility() {
    let menu = document.getElementById("navbarResponsive");

    if (menu.classList.contains("show")) {
        menu.classList.remove("show")
    } else {
        menu.classList.add("show")
    }
}

function hideHamburger(destination) {
    document.getElementById("toggle").checked = false
    plausible('Menu-Click', {props: {destination: destination, mode: 'Mobile'}})
}

function handleHamburgerMenuChanged(input) {
    const navbarCollapsible = document.body.querySelector('#mainNav');
    if (!navbarCollapsible) {
        return;
    }

    if (input.checked) {
        navbarCollapsible.classList.add('navbar-shrink')
        plausible('Open-Mobile-Menu')
    } else if (window.scrollY <= 200) {
        navbarCollapsible.classList.remove('navbar-shrink')
    }
}

function closeSubscribedAlert() {
    let alert = document.getElementById("subscribed-alert")
    let alertBackground = document.getElementById("subscribed-alert-background")
    for( child of alert.children) {
        child.style.display = "none"
    }

    alert.style.width = "10px"
    alert.style.height = "10px"

    setTimeout(() => {
        alert.style.visibility = "hidden";
        alertBackground.style.visibility = "hidden";
    }, 300)
}

window.onload = async () => {
    let threeDaysAgo = getDateThreeDaysAgo();
    fetch('/data/liveDates.json').then(response => response.json()).then(
        async result => {
            if(result.nextDates.filter(date => date.active).length == 0) {
                let datesSection = document.getElementById('dates');
                datesSection.style.display = 'none';
            }

            // Only show concerts in the future or no more in the past than three days.
            let currentConcerts = result.nextDates.filter(concert => Date.parse(concert.date) > threeDaysAgo);
            for (let concert of currentConcerts) {
                setupLiveDate(concert)
            }
        }
    )
}

function setupLiveDate(concert) {
    let formattedDate = new Date(Date.parse(concert.date)).toLocaleDateString("de-DE");
    let liveDateItem = document.createElement('li');
    liveDateItem.classList.add('concert');

    let dateItem = document.createElement('div')
    dateItem.innerHTML = `${formattedDate}, ${concert.time}`
    dateItem.classList.add('concert-part-1');

    let eventListItem = document.createElement('li');
    let eventItem;
    if(concert.link != "") {
        eventItem = document.createElement('a');
        eventItem.href = concert.link;
    } else {
        eventItem = document.createElement('div')
    }
    eventItem.innerText = concert.eventName;
    eventItem.style.fontWeight = "bold";
    eventItem.classList.add('concert-part-2')

    let locationListItem = document.createElement('li');
    let locationItem = document.createElement('div')
    locationItem.innerText = concert.location;
    locationItem.classList.add('concert-part-3')

    let horizontalLineListItem = document.createElement('li')
    let horizontalLine = document.createElement('hr')

    liveDateItem.append(dateItem);
    liveDateItem.append(eventItem);
    liveDateItem.append(locationItem);

    horizontalLineListItem.append(horizontalLine);

    document.getElementById('dates-list').append(liveDateItem, horizontalLineListItem);
}

function loadJsonFile(location) {

}

function getDateThreeDaysAgo(date = new Date()) {
    const previous = new Date(date.getTime());
    previous.setDate(date.getDate() - 3);

    return previous;
}