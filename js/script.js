$(document).ready(function () {
  // Page fade-in
  $(".page-content").addClass("show");

  // Page fade-out on links
  $("a").on("click", function (e) {
    const link = $(this).attr("href");

    if (
      link &&
      !link.startsWith("#") &&
      !link.startsWith("javascript:") &&
      !$(this).attr("target")
    ) {
      e.preventDefault();
      $(".page-content").removeClass("show");

      setTimeout(function () {
        window.location.href = link;
      }, 400);
    }
  });

  // Card fade-in
  $(".card").hide().fadeIn(800);

  // Car filter buttons
  $(".filter-btn").click(function () {
    let filter = $(this).attr("data-filter");

    $(".filter-btn").removeClass("btn-dark").addClass("btn-outline-dark");
    $(this).removeClass("btn-outline-dark").addClass("btn-dark");

    if (filter === "all") {
      $(".car-item").hide().fadeIn(500);
    } else {
      $(".car-item").hide();
      $("." + filter).fadeIn(500);
    }
  });

  // Car search
  $("#carSearch").on("keyup", function () {
    let value = $(this).val().toLowerCase();

    $(".car-item").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Dynamic details page
  const params = new URLSearchParams(window.location.search);

  if (params.has("car")) {
    const car = params.get("car");
    const price = params.get("price");
    const category = params.get("category");
    const seats = params.get("seats");
    const transmission = params.get("transmission");
    const fuel = params.get("fuel");
    const image = params.get("image");

    if ($("#detailCarName").length) {
      $("#detailCarName").text(car);
      $("#detailPrice").text(price);
      $("#detailCategory").text(category);
      $("#detailSeats").text(seats);
      $("#detailTransmission").text(transmission);
      $("#detailFuel").text(fuel);
      $("#detailImage").attr("src", image);
      $("#detailImage").attr("alt", car);

      $("#detailDescription").text(
        car +
          " is a comfortable and reliable " +
          category.toLowerCase() +
          " that is ideal for daily use, travel, and business trips."
      );

      $("#bookNowBtn").attr(
        "href",
        "booking.html?car=" +
          encodeURIComponent(car) +
          "&price=" +
          encodeURIComponent(price)
      );
    }
  }

  // Auto-select booking car from details page
  const bookingParams = new URLSearchParams(window.location.search);

  if (bookingParams.has("car") && bookingParams.has("price")) {
    const selectedCar = bookingParams.get("car");
    const selectedPrice = bookingParams.get("price");

    if ($("#carType").length) {
      $("#carType option").each(function () {
        if ($(this).text().includes(selectedCar) && $(this).val() === selectedPrice) {
          $(this).prop("selected", true);
        }
      });

      $("#carPrice").text(selectedPrice);
    }
  }

  // Login form
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    let username = $("#loginUsername").val().trim();
    let password = $("#loginPassword").val().trim();

    if (username === "" || password === "") {
      $("#loginMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Please enter both username and password.");
    } else {
      $("#loginMessage")
        .removeClass("text-danger")
        .addClass("text-success")
        .text("Login successful! Redirecting to booking page...");

      setTimeout(function () {
        window.location.href = "booking.html";
      }, 1500);
    }
  });

  // Register form
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();

    let name = $("#registerName").val().trim();
    let email = $("#registerEmail").val().trim();
    let password = $("#registerPassword").val().trim();
    let confirmPassword = $("#confirmPassword").val().trim();

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      $("#registerMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Please fill in all registration fields.");
    } else if (password !== confirmPassword) {
      $("#registerMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Passwords do not match.");
    } else {
      $("#registerMessage")
        .removeClass("text-danger")
        .addClass("text-success")
        .text("Registration successful!");
    }
  });

  // Booking calculation
  function calculateBooking() {
    let carPrice = parseInt($("#carType").val()) || 0;
    let pickupDateValue = $("#pickupDate").val();
    let returnDateValue = $("#returnDate").val();

    if (pickupDateValue && returnDateValue) {
      let pickupDate = new Date(pickupDateValue);
      let returnDate = new Date(returnDateValue);

      let timeDifference = returnDate - pickupDate;
      let totalDays = timeDifference / (1000 * 60 * 60 * 24);

      if (carPrice > 0 && totalDays > 0) {
        let totalPrice = carPrice * totalDays;
        $("#carPrice").text(carPrice);
        $("#totalDays").text(totalDays);
        $("#totalPrice").text(totalPrice);
      } else {
        $("#carPrice").text(carPrice);
        $("#totalDays").text(0);
        $("#totalPrice").text(0);
      }
    } else {
      $("#carPrice").text(carPrice);
      $("#totalDays").text(0);
      $("#totalPrice").text(0);
    }
  }

  $("#carType, #pickupDate, #returnDate").on("change", function () {
    calculateBooking();
  });

  // Booking form
  $("#bookingForm").on("submit", function (e) {
    e.preventDefault();

    let carType = $("#carType").val();
    let pickupDate = $("#pickupDate").val();
    let returnDate = $("#returnDate").val();
    let pickupLocation = $("#pickupLocation").val();
    let customerName = $("#customerName").val().trim();
    let customerEmail = $("#customerEmail").val().trim();
    let paymentMethod = $("#paymentMethod").val();
    let totalPrice = parseInt($("#totalPrice").text()) || 0;

    if (
      carType === "" ||
      pickupDate === "" ||
      returnDate === "" ||
      pickupLocation === "" ||
      customerName === "" ||
      customerEmail === "" ||
      paymentMethod === ""
    ) {
      $("#bookingMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Please fill in all booking fields.");
    } else if (totalPrice <= 0) {
      $("#bookingMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Please select valid booking dates.");
    } else {
      $("#bookingMessage")
        .removeClass("text-danger")
        .addClass("text-success")
        .text("Booking confirmed successfully!");
    }
  });

  // Contact form
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    let name = $("#contactName").val().trim();
    let email = $("#contactEmail").val().trim();
    let subject = $("#contactSubject").val().trim();
    let message = $("#contactMessage").val().trim();

    if (name === "" || email === "" || subject === "" || message === "") {
      $("#contactFormMessage")
        .removeClass("text-success")
        .addClass("text-danger")
        .text("Please complete all contact form fields.");
    } else {
      $("#contactFormMessage")
        .removeClass("text-danger")
        .addClass("text-success")
        .text("Your message has been sent successfully!");
    }
  });
});