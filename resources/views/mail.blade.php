<!DOCTYPE html>
<html lang="en">

<head>
  <title>verify</title>
  <style>
    span {
      color: rgb(255, 56, 56);
      font-weight: bold;
      font-size: 21px;
    }

    body {
      background: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Arial, Helvetica, sans-serif;
    }

    img {
      width: 500px;
    }
  </style>
</head>

<body>
    <!-- <img src='{{asset("img/SMK N 1 PURWOKERTO.png")}}' alt=""> -->
    <img class="hero" src="https://1.bp.blogspot.com/-4bzTfd-QAgE/XCBFzgqiswI/AAAAAAAARIM/8t5XIzfyx48EDTvadLkakiYzDSRAaNlZQCLcBGAs/s1600/SMK%2BN%2B1%2BPURWOKERTO.png" alt="">
    <h1>VoteSmecon</h1>
    <h3>Hi, {{ $name }}</h3>
    <p>Selamat datang di Vote Smecone. Verifikasi lebih dulu untuk lanjut.</p>
    <p>Copy kode ini untuk lanjut verifikasi <span>{{$otp}}</span></p>
    <section></section>
</body>

</html>