const crypto = require('crypto');

const verifySignature = function(secret, payload){
    const hash = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('base64');
    return `sha256=${hash}`;
  }
  
payload={"event_id":"01GJ0FH2Y3H1TYFF8EP9H2RHSG","event_type":"form_response","form_response":{"form_id":"uyifVtg4","token":"a5f3s9fabveqqec7o9l9sa5f3s9fitvt","landed_at":"2022-11-16T15:04:08Z","submitted_at":"2022-11-16T15:04:43Z","definition":{"id":"uyifVtg4","title":"My typeform","fields":[{"id":"HTE1PyMQrlQK","ref":"01GJ0DJYHF6NH3B6NH0YSP1DVF","type":"short_text","title":"Hello, what's your name?","properties":{}},{"id":"7EfljHzxs76Q","ref":"01GJ0DJYHSJ8HMEG2MQ1E819TN","type":"multiple_choice","title":"Nice to meet you, {{field:01GJ0DJYHF6NH3B6NH0YSP1DVF}}, how is your day going?","properties":{},"choices":[{"id":"rbTzd6XVsx8x","label":"Terrific!"},{"id":"tHnbelIABoFL","label":"Not so well..."}]}]},"answers":[{"type":"text","text":"Felippe","field":{"id":"HTE1PyMQrlQK","type":"short_text","ref":"01GJ0DJYHF6NH3B6NH0YSP1DVF"}},{"type":"choice","choice":{"label":"Terrific!"},"field":{"id":"7EfljHzxs76Q","type":"multiple_choice","ref":"01GJ0DJYHSJ8HMEG2MQ1E819TN"}}]}}
  
secret = "12345";
hmac = verifySignature(secret, JSON.stringify(payload));
console.log(hmac);
  