# Generate Password

Generate a secure password in your browser.  https://jacksonrayhamilton.github.io/password/

The password is generated using JavaScript locally, rather than on a remote web
server (where the password could potentially be secretly stored).  Check the
page source to confirm this.

The password is generated with the cryptographic random number generator
[`window.crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues).

Two passwords are generated:

- One with a random number of letters and numbers
- One with a random number of English words

The password with letters and numbers will be harder to guess, so I recommend
using that form for most credentials and keeping track of the password somewhere
safe.

The password with letters and numbers can be enhanced by interspersing
miscellaneous non-alphanumeric symbols into it, and I recommend this, but I
don’t do it by default because so many websites have absolutely retarded
password policies.

The password with English words will be possible to remember, so I recommend
using this form for credentials you need to type in by hand often or which you
want to commit to memory and have absolutely no written copies of anywhere (for
maximal security).

The password with English words can be made more secure by adjusting
capitalization or adding punctuation.
