import sys
import json
import datetime

# increases a users elder score with each contribution. Think through tiers.
def yongeza_ubudala():
    return

# open a path for a user to provide an english word::and its translation


def translation_couresel():
    # iterate over all words in word list
    wordfile = open('words_dictionary.json', 'r') # switch to thesaurus
    word_data = json.loads(wordfile.read())

    translated_wordfile = open('translations.json', 'r')
    prev_translations = []
    current_translations = []

    last_translation = '' # find where we left off last session
    # find last translation index in word data

    try:
        # stuff
        for word in word_data:
            ndebele_translation = input(f'{word}: ')
            
            if not ndebele_translation:
                print(f'Skipping {word}')
                continue
            
            
            translation = {
                'English': word,
                'isiNdebeleTranslations': [
                    {
                        'translation': ndebele_translation.strip(),
                        'translationDateTime': str(datetime.datetime.now()), # convert to epoch millis
                        'translatedBy': 'Busani Sibusiso Qotho',
                        'upVotes': 0,
                        'downVotes': 0
                    }
                ]
            }

            print('Created translation: ', translation)
            current_translations.append(translation)
    except KeyboardInterrupt:
        print('Process interrupted by user. Saving and exiting...')
        # save and exit
    except Exception as e:
        print(e)
    finally:
        translations = prev_translations + current_translations
        with open('translations.json', 'r') as f:
            f.write(json.dumps({
                'version': '0.0.1',
                'data': translations
            }))
    
    # return


def free_form_translation():
    # enter english::isiNdebele. If word already exists but different translation,
    # append translation to translations list
    eng_nde_translation = input('nde::eng > ')
    # validate input, never trust user
    nde, eng = eng_nde_translation.strip().split('::')

    translation = {
        'English': eng,
        'lexical_category': 'noun',
        'isiNdebeleTranslations': [
            {
                'isiNdebeleTranslation': nde.strip(),
                'translationDateTime': str(datetime.datetime.now()), # convert to epoch millis
                'translatedBy': 'Busani Sibusiso Qotho',
                'upVotes': 0,
                'downVotes': 0
            }
        ]
    }

    print('UNPERSISTED_TRANSLATION: ', translation)
    # persist_translation(translation)

    return


# find map of word metadata, e.g, verb/adj, singular/plural,synonms. then let the translations
# inherit the english metadata.

if __name__ == '__main__':
    if len(sys.argv) > 1 and sys.argv[1] == '--freeform':
        while True:
            free_form_translation()
    else:
        translation_couresel()
