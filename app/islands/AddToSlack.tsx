const goInstall = (e) => {
    console.debug(e);
    console.debug("goInstall");
    location.href = "https://api.aisebas.com/slack/install";
    return true;
};

export default function AddToSlack() {
  return (
    <button type="button" class="flex justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        onClick={goInstall}
    >
        <img src="https://aisebas.com/add-to-slack.svg" class="flex align-middle h-8 mr-3" alt="Add to Slack" />
        <span class="inline-block text-xl md:text-2xl text-center font-semibold h-[100%]" >Add to Slack</span>
    </button>
  );
}