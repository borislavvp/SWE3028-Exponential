from dotenv import load_dotenv
load_dotenv()

import time
from helpers import check_alerts

starttime = time.time()
try:

   while True:
    check_alerts()
    time.sleep(3600.0 - ((time.time() - starttime) % 3600.0))

except (Exception, KeyboardInterrupt) as e:
    print('ERROR', str(e))
    exit()
