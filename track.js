/* Formul funnel tracker — v1 */
(function(){
  const URL_="https://jwzolxpyfxtnrcvnrwds.supabase.co/rest/v1/events";
  const KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3em9seHB5Znh0bnJjdm5yd2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3NTAwNDUsImV4cCI6MjEwNDMyNjA0NX0.fmJ3nBhRksfX5X2QiXolVTgVXYYGPQN6JJH2SdXpH9Q";
  let vid=localStorage.getItem("fl_vid");if(!vid){vid=Math.random().toString(36).slice(2)+Date.now().toString(36);localStorage.setItem("fl_vid",vid)}
  const q=new URLSearchParams(location.search);if(q.get("src"))localStorage.setItem("fl_src",q.get("src").slice(0,40));
  const src=()=>localStorage.getItem("fl_src")||"";
  const user=()=>{try{const u=JSON.parse(localStorage.getItem("fl_cur")||"null");return u?(u.user||u.username||u.email||""):""}catch(e){return""}};
  const sent=new Set(JSON.parse(sessionStorage.getItem("fl_evs")||"[]"));
  function track(ev,val,once){
    if(once){if(sent.has(ev))return;sent.add(ev);sessionStorage.setItem("fl_evs",JSON.stringify([...sent]))}
    const body=JSON.stringify({vid,username:user(),ev,src:src(),val:val==null?"":String(val).slice(0,300)});
    try{fetch(URL_,{method:"POST",keepalive:true,headers:{apikey:KEY,Authorization:"Bearer "+KEY,"Content-Type":"application/json",Prefer:"return=minimal"},body}).catch(()=>{})}catch(e){}
  }
  window.FT=track;
})();
