<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    <title>Chat Roomate</title>

    <style>
        .bg-primary {
            background-color: rgb(0, 247, 255);
        }

        .text-white {
            color: white;
        }

        .text-right {
            text-align: right;
        }

        .text-left {
            text-align: left;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="row mt-3">
            <div class="col-6 offset-3">
                <div class="card">
                    <div class="card-header">
                        Chat Room
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <input type="hidden" value="Joko" name="nama" id="nama">
                        </div>
                        <div class="form-group" id="data-message">
                            {{-- data message --}}
                        </div>
                        <div class="form-group">
                            <textarea name="message" id="message" class="form-control" placeholder="Message. . ."></textarea>
                        </div>
                        <div class="form-group">
                            <button class="btn btn-block btn-primary">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Axios -->
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js"
        integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js"
        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
    <!-- ... (kode HTML sebelumnya) ... -->

    <script>
        $(function() {
            const nama = $('#nama');
            const message = $('#message');
            const dataMessage = $('#data-message');

            // Memulihkan data dari localStorage jika ada
            const storedData = JSON.parse(localStorage.getItem('chatData')) || [];
            // Menghapus seluruh data setelah refresh halaman
            localStorage.removeItem('chatData');

            // Menampilkan satu pesan jika ada
            if (storedData.length > 0) {
                displayMessage(storedData[0]);
            }

            $("input, textarea").keyup(function() {
                $(this).removeClass('is-invalid');
            });

            $("button").click(function() {
                console.log('Button clicked');
                if (nama.val() == '') {
                    console.log('Nama is empty');
                    nama.addClass('is-invalid');
                } else if (message.val() == '') {
                    console.log('Message is empty');
                    message.addClass('is-invalid');
                } else {
                    console.log('Sending data...');
                    axios.post("{{ route('send.realtime.chat2') }}", {
                        'nama': nama.val(),
                        'message': message.val()
                    }, {
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                        }
                    }).then(() => {
                        // Tansa apakah pesan sudah ada di localStorage
                        console.log('Data sent successfully');
                        const newData = {
                            nama: nama.val(),
                            message: message.val(),
                            sender: true // Pengirim? true : false
                        };
                        const existingData = storedData.find(item => (
                            item.nama === newData.nama && item.message === newData.message
                        ));

                        if (!existingData) {
                            // Jika pesan belum ada tambahkan ke localStorage
                            storedData.push(newData);
                            localStorage.setItem('chatData', JSON.stringify([newData]));

                            displayMessage(newData);
                        }

                        message.val('');
                    }).catch(error => {
                        console.error('Error posting data:', error);
                    });
                }
            });

            let channel = Echo.channel('channel-chat');
            channel.listen('ChatEvent', function(event) {
                // Pesan ini dari penerima atau bukan ? true jika beda : false jika sama 
                event.message.sender = (event.message.nama !== nama.val());

                // Mengecek apakah pesan sudah ada di localStorage
                const existingData = storedData.find(item => (
                    item.nama === event.message.nama && item.message === event.message.message
                ));

                if (!existingData) {
                    // Jika pesan belum ada, maka ditambahkan ke localStorage
                    storedData.push(event.message);
                    localStorage.setItem('chatData', JSON.stringify([event.message]));

                    displayMessage(event.message);
                }
            });

            function displayMessage(messageData) {
                const alignmentClass = messageData.sender ? 'text-left' : 'text-right';
                const backgroundClass = messageData.sender ? '' : 'bg-primary text-white';

                dataMessage.append(
                    `<div class="${alignmentClass} mb-2"><strong class="${backgroundClass}">${messageData.nama} : ${messageData.message}</strong></div>`
                );
            }

        });
    </script>

</body>

</html>
