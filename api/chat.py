from api.nltk_utils import bow, clean_up_sentence
import pickle
import random
import numpy as np

words = pickle.load(open("ml_files/words.pkl", "rb"))
classes = pickle.load(open("ml_files/classes.pkl", "rb"))

def predict_class(sentence, model):
    # filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list


def getResponse(ints, intents_json):
    print("From getResponse: ", ints[0]["intent"])
    tag = ints[0]["intent"]
    list_of_intents = intents_json["intents"]
    for i in list_of_intents:
        if i["tag"] == tag:
            result = [random.choice(i["responses"]), i["tag"]]
            break
    return result

