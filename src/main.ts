type Email = {
  from: string;
  header: string;
  content: string;
  emailAddress: string;
  img: string;
  read: boolean;
}
type State = {
  selectedEmail: Email | null;
  filter: string;
}

const emails: Email[] = [{
  from: "Nico",
  header: "Link to today's video and slides is up!",
  content: "Link is up and you know where to find it! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.",
  emailAddress: 'nico@email.com',
  img: "assets/nico.JPG",
  read: false,
},
{
  from: "Ed",
  header: "Congratulations! You have received a free beaver! Your name will now be displayed in the classroom's beaver list!",
  content: "Beaver beaver beaver beaver beaver beaver beaver beaver ! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.",
  emailAddress: 'ed@email.com',
  img: "assets/ed.JPG",
  read: false,
},
{
  from: "Government",
  header: "Time to pay your tax!",
  content: "Pay us now! Pay us now! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quo et assumenda voluptas blanditiis incidunt quia in, accusamus, qui voluptatem porro. Est reiciendis cum a architecto earum voluptatibus vel atque.",
  emailAddress: 'government@email.com',
  img: "assets/gov.jpg",
  read: false,
},
  // feel free to add more emails here
];

const state: State = {
  selectedEmail: null,
  filter: ""
}

function resetSelectedEmail(): void {
  state.selectedEmail = null;
}


function renderSingleEmail(selectedEmail: Email): void {
  selectedEmail.read = true;
  const main = document.querySelector('main');
  if (!main) return;
  main.textContent = '';

  const section = document.createElement('section');
  section.className = "single-email"

  const backButton = document.createElement('button');
  backButton.className = 'single-email__button'
  backButton.textContent = '⬅ Back';
  backButton.addEventListener("click", () => {
    resetSelectedEmail();
    render();
  });

  const userContainer = document.createElement('div');
  const userImg = document.createElement('img');
  userImg.src = selectedEmail.img;
  userImg.className = 'single-email__image'

  const userNameSpan = document.createElement('span');
  userNameSpan.textContent = `${selectedEmail.from} (${selectedEmail.emailAddress})`;
  userNameSpan.className = "single-email__sender"


  const header = document.createElement('h1');
  header.className = 'single-email__header';
  header.textContent = selectedEmail.header

  const content = document.createElement('p');
  content.className = "single-email__content";
  content.textContent = selectedEmail.content;

  userContainer.append(userImg, userNameSpan);
  section.append(backButton, userContainer, header, content)
  main?.append(section);
}

function renderEmailList(): void {
  const main = document.querySelector('main');
  if (!main) return;

  main.textContent = '';

  const header = document.createElement('h1');
  header.textContent = "Inbox"

  const ul = document.createElement('ul');
  ul.className = 'emails-list';

  const filteredEmails = getFilteredEmails();

  for (let email of filteredEmails) {
    const li = document.createElement('li');
    li.className = 'emails-list__item';

    const isReadSpan = document.createElement("span");
    isReadSpan.textContent = email.read ? '✅' : '❌'

    li.addEventListener('click', () => {
      state.selectedEmail = email
      render();
    })

    const img = document.createElement('img');
    img.className = 'emails-list__item__image';
    img.src = email.img;

    const from = document.createElement('p');
    from.className = 'emails-list__item__from';
    from.textContent = email.from;

    const content = document.createElement('p');
    content.className = 'emails-list__item__content';
    content.textContent = email.content;

    li.append(isReadSpan, img, from, content);
    ul.append(li);
  }
  main.append(header, ul)
}

function getFilteredEmails(): Email[] {
  return emails.filter(email =>
    email.from.toLowerCase().includes(state.filter.toLowerCase())
  )
}

function createInputListener(): void {
  const input = document.querySelector('input');
  if (!input) return;

  input.addEventListener('change', (event: Event) => {
    const target = event.target as HTMLTextAreaElement;

    state.selectedEmail = null;
    state.filter = target.value;

    render();
  })
}

createInputListener();


function render() {
  if (state.selectedEmail) renderSingleEmail(state.selectedEmail);
  else renderEmailList()
}

render();

