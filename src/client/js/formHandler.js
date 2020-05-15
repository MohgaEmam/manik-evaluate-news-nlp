export function handleSubmit(event) {
  event.preventDefault()

  // check what text was put into the form field
  let userUrl = document.getElementById('url').value;
  // Client.checkForName(formUrl)


  // Call postdata passing in the input url
  getSentiment(userUrl)
      .then(function(data) {
          // Call uiUpdate once data has been sent back from server
          updateUserInterface(data);
      })
}

// Async POST
const getSentiment = async(url = '') => {

  const response = await fetch('http://localhost:8085/api', {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "url": url }), // body data type must match "Content-Type" header        
  });

  try {
      const newData = await response.json();
      console.log(newData)
      return newData
  } catch (error) {
      console.log("error from client fetch", error);
  }
}
function updateUserInterface(data) {
  document.getElementById('polarity').innerHTML = `Polarity: ${data.polarity}`;
  document.getElementById('polarity_confidence').innerHTML = `Polarity Confidence: ${data.polarity_confidence}`;
  document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
  document.getElementById('subjectivity_confidence').innerHTML = `Subjectivity Confidence: ${data.subjectivity_confidence}`;

}
