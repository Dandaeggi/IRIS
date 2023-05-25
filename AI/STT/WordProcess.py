import LoadSetting
import os
import sentencepiece as spm
import re

pos_tags = ['Noun', 'Verb']
user_defined_words = ['자비스', '이리스', '메시호날두','김태수','스킵','건너뛰기']
command_mapping = {
    '실행': 'start',
    '시작': 'start',
    # '시키다': 'start',
    # '시켜': 'start',
    '열어': 'start',
    # '시키기': 'start',
    '켜': 'start',
    '켜줘': 'start',
    '켜라': 'start',
    '켜다': 'start',
    '키다': 'start',
    '키기': 'start',
    '키여': 'start',
    '열기': 'start',
    '열다': 'start',
    '틀다': 'start',
    '틀어': 'start',

    '끄다': 'exit',
    '종료': 'exit',
    '꺼줘': 'exit',
    '꺼': 'exit',
    '끄기': 'exit',
    '끄여': 'exit',
    '닫다': 'exit',
    '닫기': 'exit',
    '닫아': 'exit',
    '닫아줘': 'exit',
    '멈추다': 'exit',
    '멈추기': 'exit',
    '멈추어': 'exit',
    '멈춰': 'exit',
    '멈춰줘': 'exit',
    '볼륨' : 'volum',
    '소리' : 'volum',
    '음량' : 'volum',
    '스피커': 'volum',

    '검색':'search',
    '찾아':'search',
    '캡쳐':'capture',
    '스크린샷':'capture',
    '스크린 샷':'capture',
    '캡처':'capture',

    '날씨':'weather',

    '쉬어':'wait',
    '쉬다':'wait',
    '쉬고':'wait',

    '업' : 'up',
    '키워' : 'up',
    '올려':'up',
    '다운' : 'down',
    '줄여' : 'down',
    '내려' : 'down',
    '이전' : 'prev',
    '다음' : 'next',
    '앞으로' : 'go',
    '뒤로' : 'back',
    '정지' : 'stop',
    '일시정지' : 'stop',
    '스탑' : 'stop',
    '스톱' : 'stop',

    '유튜브' : 'youtube',
    '유투브' : 'youtube',
    '모드' : 'mode',

    '스킵':'skip',
    '건너뛰기':'skip',
    '이동' : 'move'
}

analysisCode = "morp"
text = "YOUR_SENTENCE"


def tokenize_with_user_defined_words(text, tokenizer, user_defined_words):
    user_defined_pattern = '|'.join(map(re.escape, user_defined_words))
    user_defined_regex = re.compile(f'({user_defined_pattern})')

    segments = user_defined_regex.split(text)

    tokens = []
    for segment in segments:
        if segment in user_defined_words:
            tokens.append(segment)
        else:
            tokens.extend(tokenizer.encode_as_pieces(segment))
    return tokens

def etri_commands(text):
    user_defined_words.append(LoadSetting.iris_name)
    for program in LoadSetting.command_open.keys():
        user_defined_words.append(program)
    for program in LoadSetting.custom_open.keys():
        user_defined_words.append(program)
    for program in LoadSetting.combine_list.keys():
        user_defined_words.append(program)

    # model_path = "spiece.model"
    # model_path = os.path.abspath("C:\\Users\\PycharmProjects\\fastapi\\spiece.model")
    model_path = os.path.abspath(os.getcwd() + "\\resources\irisSTT-v2\\spiece.model")
    tokenizer = spm.SentencePieceProcessor()
    tokenizer.load(model_path)
    tokens = tokenize_with_user_defined_words(text, tokenizer, user_defined_words)
    # tokens = tokenizer.encode_as_pieces(text)
    execute_commands=[]
    number_pattern = re.compile(r'\d+')
    for token in tokens:
        # '_' 문자를 제거하고, 토큰을 리스트에 추가합니다.
        token = token.replace('▁', '')
        if number_pattern.match(token):
            execute_commands.append(token)
            continue
        if token in LoadSetting.combine_list:
            execute_commands.append(token)
            return execute_commands
        if token in command_mapping:
            if command_mapping[token]=='search':
                execute_commands2 = []
                execute_commands2.append(text)
                execute_commands2.append(command_mapping[token])
                return execute_commands2
            elif command_mapping[token]=='weather':
                execute_commands2 = []
                execute_commands2.append(text)
                execute_commands2.append(command_mapping[token])
                return execute_commands2
            token = command_mapping[token]
        execute_commands.append(token)
    # print(execute_commands)
    execute_commands.append(text)
    return execute_commands
