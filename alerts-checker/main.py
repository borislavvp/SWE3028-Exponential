from dotenv import load_dotenv
load_dotenv()

import time
from helpers import check_alerts

starttime = time.time()
try:

   while True:
    check_alerts()
    time.sleep(900.0 - ((time.time() - starttime) % 900.0))

except (Exception, KeyboardInterrupt) as e:
    print('ERROR', str(e))
    exit()
