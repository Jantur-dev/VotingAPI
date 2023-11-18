<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Bootstrap demo</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <style>
        .chat-message {
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
            max-width: 70%;
        }

        .own-message {
            background-color: #4CAF50;
            color: white;
            align-self: flex-end;
        }
    </style>

</head>

<body>

    <div class="col-md-9 mx-auto">
        <div id="data-message">
            {{--  --}}
        </div>
    </div>

    <div class="col-md-9 mx-auto">
        <form action="{{ route('send.realtime.chat') }}" method="POST">
            @csrf
            <div class="card-body">
                <div class="form-group">
                    <input type="hidden" name="nama" value="Joko">
                </div>
                <div class="form-group">
                    <textarea name="message" id="message" class="form-control" placeholder="Messages"></textarea>
                </div>
                <div class="card-footer">
                    <div class="float-right">
                        <button type="submit" class="btn btn-primary">Send</button>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous">
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>

</html>
