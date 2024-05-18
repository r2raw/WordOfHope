PGDMP     )                    |            WOH    15.4    15.4 z    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    42058    WOH    DATABASE     ~   CREATE DATABASE "WOH" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
    DROP DATABASE "WOH";
                postgres    false            �            1259    42059    appointmentsched    TABLE     �  CREATE TABLE public.appointmentsched (
    id character varying(50) NOT NULL,
    appointmenttime time without time zone,
    appointmentdate date,
    type character varying(50),
    reason character varying(100),
    service integer,
    method character varying(10),
    qrcode character varying(50),
    appointedfor character varying(50),
    datebooked timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    status character varying(50)
);
 $   DROP TABLE public.appointmentsched;
       public         heap    postgres    false            �            1259    42063 
   attendance    TABLE     E  CREATE TABLE public.attendance (
    id integer NOT NULL,
    empid character varying,
    starttime time without time zone,
    endtime time without time zone,
    arrival timestamp without time zone,
    departure timestamp without time zone,
    status character varying(50),
    arrivalimg text,
    departureimg text
);
    DROP TABLE public.attendance;
       public         heap    postgres    false            �            1259    42068    attendance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attendance_id_seq;
       public          postgres    false    215            �           0    0    attendance_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;
          public          postgres    false    216            �            1259    42069    departments    TABLE     �   CREATE TABLE public.departments (
    id integer NOT NULL,
    department_name character varying(250),
    availability character varying(50)
);
    DROP TABLE public.departments;
       public         heap    postgres    false            �            1259    42072    departments_id_seq    SEQUENCE     �   CREATE SEQUENCE public.departments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.departments_id_seq;
       public          postgres    false    217            �           0    0    departments_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.departments_id_seq OWNED BY public.departments.id;
          public          postgres    false    218            �            1259    42481    diagnosis_record    TABLE     �   CREATE TABLE public.diagnosis_record (
    id integer NOT NULL,
    record_id character varying(50),
    diagnosis character varying(500)
);
 $   DROP TABLE public.diagnosis_record;
       public         heap    postgres    false            �            1259    42480    diagnosis_record_id_seq    SEQUENCE     �   CREATE SEQUENCE public.diagnosis_record_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.diagnosis_record_id_seq;
       public          postgres    false    238            �           0    0    diagnosis_record_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.diagnosis_record_id_seq OWNED BY public.diagnosis_record.id;
          public          postgres    false    237            �            1259    42073    employee    TABLE     �  CREATE TABLE public.employee (
    id character varying NOT NULL,
    firstname character varying(50),
    lastname character varying(250),
    middlename character varying(250),
    suffix character varying(50),
    sex character varying(50),
    birthdate date,
    phone character varying(250),
    province character varying(250),
    city character varying(250),
    barangay character varying(250),
    street character varying(250),
    zip character varying(10),
    "position" integer,
    department integer,
    emptype character varying(100),
    rfid character varying(100),
    userid integer,
    createdby integer,
    modifiedby integer,
    empimg text
);
    DROP TABLE public.employee;
       public         heap    postgres    false            �            1259    42078    employeesched    TABLE       CREATE TABLE public.employeesched (
    id integer NOT NULL,
    empid character varying,
    starttime time without time zone,
    endtime time without time zone,
    day character varying(10),
    iseffective boolean,
    createdby integer,
    modifiedby integer
);
 !   DROP TABLE public.employeesched;
       public         heap    postgres    false            �            1259    42083    employeesched_id_seq    SEQUENCE     �   CREATE SEQUENCE public.employeesched_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.employeesched_id_seq;
       public          postgres    false    220            �           0    0    employeesched_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.employeesched_id_seq OWNED BY public.employeesched.id;
          public          postgres    false    221            �            1259    42445    patient    TABLE       CREATE TABLE public.patient (
    patient_id character varying(50) NOT NULL,
    firstname character varying(250),
    lastname character varying(250),
    middlename character varying(250),
    suffix character varying(250),
    sex character varying(10),
    birthdate date,
    email character varying(250),
    phone character varying(250),
    street character varying(250),
    city character varying(250),
    province character varying(250),
    barangay character varying(250),
    zip character varying(10),
    user_id integer
);
    DROP TABLE public.patient;
       public         heap    postgres    false            �            1259    42457    patient_record    TABLE     3  CREATE TABLE public.patient_record (
    id character varying(50) NOT NULL,
    patient_id character varying(50),
    service_id integer,
    doctor_id character varying,
    doctor_comment character varying(500),
    date_visit date,
    date_added timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
 "   DROP TABLE public.patient_record;
       public         heap    postgres    false            �            1259    42084 	   positions    TABLE     �   CREATE TABLE public.positions (
    id integer NOT NULL,
    department_id integer,
    position_name character varying(250),
    availability character varying(50)
);
    DROP TABLE public.positions;
       public         heap    postgres    false            �            1259    42087    positions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.positions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.positions_id_seq;
       public          postgres    false    222            �           0    0    positions_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.positions_id_seq OWNED BY public.positions.id;
          public          postgres    false    223            �            1259    42088    queue    TABLE     �   CREATE TABLE public.queue (
    id integer NOT NULL,
    queue_no integer,
    appointment_id character varying(50),
    doctors_id character varying(50),
    date_of_arrival timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.queue;
       public         heap    postgres    false            �            1259    42092    queue_id_seq    SEQUENCE     �   CREATE SEQUENCE public.queue_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.queue_id_seq;
       public          postgres    false    224            �           0    0    queue_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.queue_id_seq OWNED BY public.queue.id;
          public          postgres    false    225            �            1259    42093    services    TABLE     �   CREATE TABLE public.services (
    id integer NOT NULL,
    department_id integer,
    service_name character varying(250),
    service_type character varying(250),
    available_online boolean,
    availability character varying(50)
);
    DROP TABLE public.services;
       public         heap    postgres    false            �            1259    42098    services_id_seq    SEQUENCE     �   CREATE SEQUENCE public.services_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.services_id_seq;
       public          postgres    false    226            �           0    0    services_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.services_id_seq OWNED BY public.services.id;
          public          postgres    false    227            �            1259    42099    thirdpartyappointment    TABLE     	  CREATE TABLE public.thirdpartyappointment (
    id character varying(50) NOT NULL,
    appointedby integer,
    firstname character varying(50),
    lastname character varying(250),
    middlename character varying(250),
    suffix character varying(50),
    sex character varying(50),
    birthdate date,
    province character varying(250),
    city character varying(250),
    barangay character varying(250),
    street character varying(250),
    zip character varying(10),
    relationship character varying(50)
);
 )   DROP TABLE public.thirdpartyappointment;
       public         heap    postgres    false            �            1259    42104    userappointment    TABLE     c   CREATE TABLE public.userappointment (
    id character varying(50) NOT NULL,
    userid integer
);
 #   DROP TABLE public.userappointment;
       public         heap    postgres    false            �            1259    50483    useremergencycontact    TABLE     W  CREATE TABLE public.useremergencycontact (
    id integer NOT NULL,
    userid integer,
    lastname character varying(250),
    firstname character varying(250),
    middlename character varying(250),
    suffix character varying(10),
    relation character varying(259),
    phone character varying(250),
    email character varying(250)
);
 (   DROP TABLE public.useremergencycontact;
       public         heap    postgres    false            �            1259    50482    useremergencycontact_id_seq    SEQUENCE     �   CREATE SEQUENCE public.useremergencycontact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.useremergencycontact_id_seq;
       public          postgres    false    240            �           0    0    useremergencycontact_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.useremergencycontact_id_seq OWNED BY public.useremergencycontact.id;
          public          postgres    false    239            �            1259    42112    userprofile    TABLE     �  CREATE TABLE public.userprofile (
    id integer NOT NULL,
    lastname character varying(250),
    firstname character varying(250),
    suffix character varying(50),
    middlename character varying(250),
    sex character varying(50),
    birthdate date,
    phone character varying(250),
    province character varying(250),
    city character varying(250),
    barangay character varying(250),
    street character varying(250),
    zip character varying(10),
    userid integer,
    empimg text
);
    DROP TABLE public.userprofile;
       public         heap    postgres    false            �            1259    42117    userprofile_id_seq    SEQUENCE     �   CREATE SEQUENCE public.userprofile_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.userprofile_id_seq;
       public          postgres    false    230            �           0    0    userprofile_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.userprofile_id_seq OWNED BY public.userprofile.id;
          public          postgres    false    231            �            1259    42272    walkinappointment    TABLE     �  CREATE TABLE public.walkinappointment (
    id character varying(50) NOT NULL,
    appointedby character varying,
    firstname character varying(50),
    lastname character varying(250),
    middlename character varying(250),
    suffix character varying(50),
    sex character varying(50),
    birthdate date,
    province character varying(250),
    city character varying(250),
    barangay character varying(250),
    street character varying(250),
    zip character varying(10)
);
 %   DROP TABLE public.walkinappointment;
       public         heap    postgres    false            �            1259    42118    wohuser    TABLE     k  CREATE TABLE public.wohuser (
    id integer NOT NULL,
    username character varying(250),
    password character varying(250),
    usertype character varying(250),
    email character varying(250),
    loggedin boolean,
    accountstatus character varying(250),
    firsttimelog boolean,
    datecreated timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.wohuser;
       public         heap    postgres    false            �            1259    42124    wohuser_id_seq    SEQUENCE     �   CREATE SEQUENCE public.wohuser_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.wohuser_id_seq;
       public          postgres    false    232            �           0    0    wohuser_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.wohuser_id_seq OWNED BY public.wohuser.id;
          public          postgres    false    233            �           2604    42125    attendance id    DEFAULT     n   ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);
 <   ALTER TABLE public.attendance ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            �           2604    42126    departments id    DEFAULT     p   ALTER TABLE ONLY public.departments ALTER COLUMN id SET DEFAULT nextval('public.departments_id_seq'::regclass);
 =   ALTER TABLE public.departments ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �           2604    42484    diagnosis_record id    DEFAULT     z   ALTER TABLE ONLY public.diagnosis_record ALTER COLUMN id SET DEFAULT nextval('public.diagnosis_record_id_seq'::regclass);
 B   ALTER TABLE public.diagnosis_record ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    238    237    238            �           2604    42127    employeesched id    DEFAULT     t   ALTER TABLE ONLY public.employeesched ALTER COLUMN id SET DEFAULT nextval('public.employeesched_id_seq'::regclass);
 ?   ALTER TABLE public.employeesched ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220            �           2604    42128    positions id    DEFAULT     l   ALTER TABLE ONLY public.positions ALTER COLUMN id SET DEFAULT nextval('public.positions_id_seq'::regclass);
 ;   ALTER TABLE public.positions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222            �           2604    42129    queue id    DEFAULT     d   ALTER TABLE ONLY public.queue ALTER COLUMN id SET DEFAULT nextval('public.queue_id_seq'::regclass);
 7   ALTER TABLE public.queue ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224            �           2604    42130    services id    DEFAULT     j   ALTER TABLE ONLY public.services ALTER COLUMN id SET DEFAULT nextval('public.services_id_seq'::regclass);
 :   ALTER TABLE public.services ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226            �           2604    50486    useremergencycontact id    DEFAULT     �   ALTER TABLE ONLY public.useremergencycontact ALTER COLUMN id SET DEFAULT nextval('public.useremergencycontact_id_seq'::regclass);
 F   ALTER TABLE public.useremergencycontact ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    239    240    240            �           2604    42131    userprofile id    DEFAULT     p   ALTER TABLE ONLY public.userprofile ALTER COLUMN id SET DEFAULT nextval('public.userprofile_id_seq'::regclass);
 =   ALTER TABLE public.userprofile ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    231    230            �           2604    42132 
   wohuser id    DEFAULT     h   ALTER TABLE ONLY public.wohuser ALTER COLUMN id SET DEFAULT nextval('public.wohuser_id_seq'::regclass);
 9   ALTER TABLE public.wohuser ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    233    232            �          0    42059    appointmentsched 
   TABLE DATA           �   COPY public.appointmentsched (id, appointmenttime, appointmentdate, type, reason, service, method, qrcode, appointedfor, datebooked, status) FROM stdin;
    public          postgres    false    214   �       �          0    42063 
   attendance 
   TABLE DATA           y   COPY public.attendance (id, empid, starttime, endtime, arrival, departure, status, arrivalimg, departureimg) FROM stdin;
    public          postgres    false    215   K�       �          0    42069    departments 
   TABLE DATA           H   COPY public.departments (id, department_name, availability) FROM stdin;
    public          postgres    false    217   K�       �          0    42481    diagnosis_record 
   TABLE DATA           D   COPY public.diagnosis_record (id, record_id, diagnosis) FROM stdin;
    public          postgres    false    238   ?�       �          0    42073    employee 
   TABLE DATA           �   COPY public.employee (id, firstname, lastname, middlename, suffix, sex, birthdate, phone, province, city, barangay, street, zip, "position", department, emptype, rfid, userid, createdby, modifiedby, empimg) FROM stdin;
    public          postgres    false    219   }�       �          0    42078    employeesched 
   TABLE DATA           o   COPY public.employeesched (id, empid, starttime, endtime, day, iseffective, createdby, modifiedby) FROM stdin;
    public          postgres    false    220   S�       �          0    42445    patient 
   TABLE DATA           �   COPY public.patient (patient_id, firstname, lastname, middlename, suffix, sex, birthdate, email, phone, street, city, province, barangay, zip, user_id) FROM stdin;
    public          postgres    false    235   �       �          0    42457    patient_record 
   TABLE DATA           w   COPY public.patient_record (id, patient_id, service_id, doctor_id, doctor_comment, date_visit, date_added) FROM stdin;
    public          postgres    false    236   �       �          0    42084 	   positions 
   TABLE DATA           S   COPY public.positions (id, department_id, position_name, availability) FROM stdin;
    public          postgres    false    222   L�       �          0    42088    queue 
   TABLE DATA           Z   COPY public.queue (id, queue_no, appointment_id, doctors_id, date_of_arrival) FROM stdin;
    public          postgres    false    224   ��       �          0    42093    services 
   TABLE DATA           q   COPY public.services (id, department_id, service_name, service_type, available_online, availability) FROM stdin;
    public          postgres    false    226   ��       �          0    42099    thirdpartyappointment 
   TABLE DATA           �   COPY public.thirdpartyappointment (id, appointedby, firstname, lastname, middlename, suffix, sex, birthdate, province, city, barangay, street, zip, relationship) FROM stdin;
    public          postgres    false    228   Ƚ       �          0    42104    userappointment 
   TABLE DATA           5   COPY public.userappointment (id, userid) FROM stdin;
    public          postgres    false    229   ��       �          0    50483    useremergencycontact 
   TABLE DATA           {   COPY public.useremergencycontact (id, userid, lastname, firstname, middlename, suffix, relation, phone, email) FROM stdin;
    public          postgres    false    240   �       �          0    42112    userprofile 
   TABLE DATA           �   COPY public.userprofile (id, lastname, firstname, suffix, middlename, sex, birthdate, phone, province, city, barangay, street, zip, userid, empimg) FROM stdin;
    public          postgres    false    230   b�       �          0    42272    walkinappointment 
   TABLE DATA           �   COPY public.walkinappointment (id, appointedby, firstname, lastname, middlename, suffix, sex, birthdate, province, city, barangay, street, zip) FROM stdin;
    public          postgres    false    234   ��       �          0    42118    wohuser 
   TABLE DATA           ~   COPY public.wohuser (id, username, password, usertype, email, loggedin, accountstatus, firsttimelog, datecreated) FROM stdin;
    public          postgres    false    232   ��       �           0    0    attendance_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.attendance_id_seq', 26, true);
          public          postgres    false    216            �           0    0    departments_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.departments_id_seq', 14, true);
          public          postgres    false    218            �           0    0    diagnosis_record_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.diagnosis_record_id_seq', 24, true);
          public          postgres    false    237            �           0    0    employeesched_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.employeesched_id_seq', 174, true);
          public          postgres    false    221            �           0    0    positions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.positions_id_seq', 25, true);
          public          postgres    false    223            �           0    0    queue_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.queue_id_seq', 37, true);
          public          postgres    false    225            �           0    0    services_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.services_id_seq', 39, true);
          public          postgres    false    227            �           0    0    useremergencycontact_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.useremergencycontact_id_seq', 3, true);
          public          postgres    false    239            �           0    0    userprofile_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.userprofile_id_seq', 4, true);
          public          postgres    false    231            �           0    0    wohuser_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.wohuser_id_seq', 39, true);
          public          postgres    false    233            �           2606    42134 &   appointmentsched appointmentsched_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.appointmentsched
    ADD CONSTRAINT appointmentsched_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.appointmentsched DROP CONSTRAINT appointmentsched_pkey;
       public            postgres    false    214            �           2606    42136    attendance attendance_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_pkey;
       public            postgres    false    215            �           2606    42138    departments departments_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.departments
    ADD CONSTRAINT departments_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.departments DROP CONSTRAINT departments_pkey;
       public            postgres    false    217            �           2606    42488 &   diagnosis_record diagnosis_record_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.diagnosis_record
    ADD CONSTRAINT diagnosis_record_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.diagnosis_record DROP CONSTRAINT diagnosis_record_pkey;
       public            postgres    false    238            �           2606    42140    employee employee_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_pkey;
       public            postgres    false    219            �           2606    42142     employeesched employeesched_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.employeesched
    ADD CONSTRAINT employeesched_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.employeesched DROP CONSTRAINT employeesched_pkey;
       public            postgres    false    220            �           2606    42451    patient patient_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_pkey PRIMARY KEY (patient_id);
 >   ALTER TABLE ONLY public.patient DROP CONSTRAINT patient_pkey;
       public            postgres    false    235            �           2606    42464 "   patient_record patient_record_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.patient_record
    ADD CONSTRAINT patient_record_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.patient_record DROP CONSTRAINT patient_record_pkey;
       public            postgres    false    236            �           2606    42144    positions positions_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_pkey;
       public            postgres    false    222            �           2606    42146    queue queue_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.queue DROP CONSTRAINT queue_pkey;
       public            postgres    false    224            �           2606    42148    services services_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.services DROP CONSTRAINT services_pkey;
       public            postgres    false    226            �           2606    42150 0   thirdpartyappointment thirdpartyappointment_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.thirdpartyappointment
    ADD CONSTRAINT thirdpartyappointment_pkey PRIMARY KEY (id);
 Z   ALTER TABLE ONLY public.thirdpartyappointment DROP CONSTRAINT thirdpartyappointment_pkey;
       public            postgres    false    228            �           2606    42152 $   userappointment userappointment_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.userappointment
    ADD CONSTRAINT userappointment_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.userappointment DROP CONSTRAINT userappointment_pkey;
       public            postgres    false    229            �           2606    50490 .   useremergencycontact useremergencycontact_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.useremergencycontact
    ADD CONSTRAINT useremergencycontact_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.useremergencycontact DROP CONSTRAINT useremergencycontact_pkey;
       public            postgres    false    240            �           2606    42156    userprofile userprofile_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.userprofile
    ADD CONSTRAINT userprofile_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.userprofile DROP CONSTRAINT userprofile_pkey;
       public            postgres    false    230            �           2606    42278 (   walkinappointment walkinappointment_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.walkinappointment
    ADD CONSTRAINT walkinappointment_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.walkinappointment DROP CONSTRAINT walkinappointment_pkey;
       public            postgres    false    234            �           2606    42158    wohuser wohuser_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.wohuser
    ADD CONSTRAINT wohuser_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.wohuser DROP CONSTRAINT wohuser_pkey;
       public            postgres    false    232            �           2606    42159 .   appointmentsched appointmentsched_service_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.appointmentsched
    ADD CONSTRAINT appointmentsched_service_fkey FOREIGN KEY (service) REFERENCES public.services(id);
 X   ALTER TABLE ONLY public.appointmentsched DROP CONSTRAINT appointmentsched_service_fkey;
       public          postgres    false    3275    226    214            �           2606    42164     attendance attendance_empid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_empid_fkey FOREIGN KEY (empid) REFERENCES public.employee(id);
 J   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_empid_fkey;
       public          postgres    false    3267    219    215            �           2606    42489 0   diagnosis_record diagnosis_record_record_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diagnosis_record
    ADD CONSTRAINT diagnosis_record_record_id_fkey FOREIGN KEY (record_id) REFERENCES public.patient_record(id);
 Z   ALTER TABLE ONLY public.diagnosis_record DROP CONSTRAINT diagnosis_record_record_id_fkey;
       public          postgres    false    3289    238    236            �           2606    42169     employee employee_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_createdby_fkey FOREIGN KEY (createdby) REFERENCES public.wohuser(id);
 J   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_createdby_fkey;
       public          postgres    false    232    219    3283            �           2606    42174 !   employee employee_department_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_department_fkey FOREIGN KEY (department) REFERENCES public.departments(id);
 K   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_department_fkey;
       public          postgres    false    217    219    3265            �           2606    42179 !   employee employee_modifiedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_modifiedby_fkey FOREIGN KEY (modifiedby) REFERENCES public.wohuser(id);
 K   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_modifiedby_fkey;
       public          postgres    false    232    219    3283            �           2606    42184    employee employee_position_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_position_fkey FOREIGN KEY ("position") REFERENCES public.positions(id);
 I   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_position_fkey;
       public          postgres    false    3271    219    222            �           2606    42189    employee employee_userid_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.employee
    ADD CONSTRAINT employee_userid_fkey FOREIGN KEY (userid) REFERENCES public.wohuser(id);
 G   ALTER TABLE ONLY public.employee DROP CONSTRAINT employee_userid_fkey;
       public          postgres    false    3283    219    232            �           2606    42194 *   employeesched employeesched_createdby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employeesched
    ADD CONSTRAINT employeesched_createdby_fkey FOREIGN KEY (createdby) REFERENCES public.wohuser(id);
 T   ALTER TABLE ONLY public.employeesched DROP CONSTRAINT employeesched_createdby_fkey;
       public          postgres    false    220    232    3283            �           2606    42199 &   employeesched employeesched_empid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employeesched
    ADD CONSTRAINT employeesched_empid_fkey FOREIGN KEY (empid) REFERENCES public.employee(id);
 P   ALTER TABLE ONLY public.employeesched DROP CONSTRAINT employeesched_empid_fkey;
       public          postgres    false    220    219    3267            �           2606    42204 +   employeesched employeesched_modifiedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.employeesched
    ADD CONSTRAINT employeesched_modifiedby_fkey FOREIGN KEY (modifiedby) REFERENCES public.wohuser(id);
 U   ALTER TABLE ONLY public.employeesched DROP CONSTRAINT employeesched_modifiedby_fkey;
       public          postgres    false    220    232    3283            �           2606    42475 ,   patient_record patient_record_doctor_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient_record
    ADD CONSTRAINT patient_record_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.employee(id);
 V   ALTER TABLE ONLY public.patient_record DROP CONSTRAINT patient_record_doctor_id_fkey;
       public          postgres    false    3267    236    219            �           2606    42465 -   patient_record patient_record_patient_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient_record
    ADD CONSTRAINT patient_record_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient(patient_id);
 W   ALTER TABLE ONLY public.patient_record DROP CONSTRAINT patient_record_patient_id_fkey;
       public          postgres    false    236    235    3287            �           2606    42470 -   patient_record patient_record_service_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.patient_record
    ADD CONSTRAINT patient_record_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id);
 W   ALTER TABLE ONLY public.patient_record DROP CONSTRAINT patient_record_service_id_fkey;
       public          postgres    false    236    226    3275            �           2606    42452    patient patient_user_id_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.patient
    ADD CONSTRAINT patient_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.wohuser(id);
 F   ALTER TABLE ONLY public.patient DROP CONSTRAINT patient_user_id_fkey;
       public          postgres    false    3283    232    235            �           2606    42209 &   positions positions_department_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.positions
    ADD CONSTRAINT positions_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);
 P   ALTER TABLE ONLY public.positions DROP CONSTRAINT positions_department_id_fkey;
       public          postgres    false    222    217    3265            �           2606    42214    queue queue_appointment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointmentsched(id);
 I   ALTER TABLE ONLY public.queue DROP CONSTRAINT queue_appointment_id_fkey;
       public          postgres    false    224    214    3261            �           2606    42219    queue queue_doctors_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.queue
    ADD CONSTRAINT queue_doctors_id_fkey FOREIGN KEY (doctors_id) REFERENCES public.employee(id);
 E   ALTER TABLE ONLY public.queue DROP CONSTRAINT queue_doctors_id_fkey;
       public          postgres    false    219    3267    224            �           2606    42224 $   services services_department_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id);
 N   ALTER TABLE ONLY public.services DROP CONSTRAINT services_department_id_fkey;
       public          postgres    false    226    217    3265            �           2606    42229 <   thirdpartyappointment thirdpartyappointment_appointedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.thirdpartyappointment
    ADD CONSTRAINT thirdpartyappointment_appointedby_fkey FOREIGN KEY (appointedby) REFERENCES public.wohuser(id);
 f   ALTER TABLE ONLY public.thirdpartyappointment DROP CONSTRAINT thirdpartyappointment_appointedby_fkey;
       public          postgres    false    3283    228    232            �           2606    42234 3   thirdpartyappointment thirdpartyappointment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.thirdpartyappointment
    ADD CONSTRAINT thirdpartyappointment_id_fkey FOREIGN KEY (id) REFERENCES public.appointmentsched(id);
 ]   ALTER TABLE ONLY public.thirdpartyappointment DROP CONSTRAINT thirdpartyappointment_id_fkey;
       public          postgres    false    228    3261    214            �           2606    42239 '   userappointment userappointment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.userappointment
    ADD CONSTRAINT userappointment_id_fkey FOREIGN KEY (id) REFERENCES public.appointmentsched(id);
 Q   ALTER TABLE ONLY public.userappointment DROP CONSTRAINT userappointment_id_fkey;
       public          postgres    false    214    3261    229            �           2606    42244 +   userappointment userappointment_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.userappointment
    ADD CONSTRAINT userappointment_userid_fkey FOREIGN KEY (userid) REFERENCES public.wohuser(id);
 U   ALTER TABLE ONLY public.userappointment DROP CONSTRAINT userappointment_userid_fkey;
       public          postgres    false    232    3283    229            �           2606    50491 5   useremergencycontact useremergencycontact_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.useremergencycontact
    ADD CONSTRAINT useremergencycontact_userid_fkey FOREIGN KEY (userid) REFERENCES public.wohuser(id);
 _   ALTER TABLE ONLY public.useremergencycontact DROP CONSTRAINT useremergencycontact_userid_fkey;
       public          postgres    false    232    3283    240            �           2606    42254 #   userprofile userprofile_userid_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.userprofile
    ADD CONSTRAINT userprofile_userid_fkey FOREIGN KEY (userid) REFERENCES public.wohuser(id);
 M   ALTER TABLE ONLY public.userprofile DROP CONSTRAINT userprofile_userid_fkey;
       public          postgres    false    3283    232    230            �           2606    42284 4   walkinappointment walkinappointment_appointedby_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.walkinappointment
    ADD CONSTRAINT walkinappointment_appointedby_fkey FOREIGN KEY (appointedby) REFERENCES public.employee(id);
 ^   ALTER TABLE ONLY public.walkinappointment DROP CONSTRAINT walkinappointment_appointedby_fkey;
       public          postgres    false    219    3267    234            �           2606    42279 +   walkinappointment walkinappointment_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.walkinappointment
    ADD CONSTRAINT walkinappointment_id_fkey FOREIGN KEY (id) REFERENCES public.appointmentsched(id);
 U   ALTER TABLE ONLY public.walkinappointment DROP CONSTRAINT walkinappointment_id_fkey;
       public          postgres    false    234    3261    214            �   W  x��XMo�F=O~����!9���h���"(z)P��Qj�cew�/��M43��l�y��#�h)� @�R�G�D��zV��ۯ��G�[<��a��?��O�i7�χ��ŷ��C���P��dK�nx������#���c;<��7� � �F k#hl��[�QI�lwq߿�'g�	�4�y��y��{��.�w��N���������6*����l��Y�`6��fW�3Ƹ4�!hQ+G����yn���}|�ݹ ^HWkY��
�Θ �vM�t�mB�nN8�e,d�����j��#�Y$I ��T�+tJ|:l�<��x��&���*fj�q��.л`�]I'ˑp �:���]�d��,�t�iٵ� hs~��ʊ"]aBȵ���T�o�C�������[�e;�?-@;�9v~Eھ0V���W�MA�4�t*]��������a��k��	�v���u{�\��%��q��b+�R|\ͺ3}�b��Z���w1�:�4|�^�z��.��������Y���yx;�}�>���i;
�1�Ʋ5���#T��������wS_�\��u�y7���(�E�G)[cz<��sPM�"��7~J@I	�	H��	 _hE�L��=���"s�@.	��JQ��Z�l%�)����TH��-t�P9��)�u� ��Si���W��P
X���ŏ��`���'�kPI
~�mN@XY�<�̏�c7:��W�1 i��<;u#?O��f���h���-�Ǌ��8Xy��q����������C-wG6�����!�C*`�����+��&ў�`ta__D����*6�n\O˯b��/�_Ő��(nK�C�%�_�����r߽�����\`^�w8�����9ȗ8s�5\%��H�h������E���W������8_=V�:���?׹O�OUw�{����|��? �����H
��� 0��h��d��8_���ڽ񍫍�M�h�ޜp|%�4^g> �#PN~�X:��S�a/#�_�܈@lP>�7ZP�A䖶�L&�r)O~x7.%��I�G׻�2��AkQ�`iܸ	�-e�guss����F      �   �  x����nGE�3_�(�o�z�E� ��,�A�F�,����=�h4��0�B�y�����DħϿ�GH��7���i��q��@4)9�����ߟ�����tz|}}~yz|����_';g/��jV�U�����_W�J���z�H1��ճ�P��i"��n�x�>��R��D6c 
mQ)�vᐦ��.WϺF�l����Y�T���K�;3�(��n}�ʻr�ѫ	s�����֩�&�����'����*H,"-���4��	Vw����3�P��B ���L&$Q��F��H3c	f�T%RNn- *�x�
P�*���{*�#�"����:�؁RJSj�Y�L�@�T9�Jjݜ�$q��.��ϔ�5��j����9G��-�*�.�X1�ܜl����	�h��M,�wj�������	�;":q\~������'�__�7�<%S���ۊ��u+j�J0�4��"]Q�&��&�!��@1�p#��3 ���X��Q^�a��R�̠�
fuO�����zC��;6Mb��&5��.y?3!�5�+��}�kLͣ�ᖱ+��9�ZF_��;�F���iK0�L'�=���S��Q���hP
M��%���姡�n.mX���u'$�Ԫ4c6�߉`(a�_r�sc��r���R��8,W���ہ8��*����,�/�D�ߐ�7���d�7��d���Lo�:jݔ�PѰ%�8&d�i�9$%#�?�z�XpA���޳�ɨc8B�u��Mú��.V��8��ٲ��%��n族WR+l'F�z}{�m���r��2V�ֶ�f��y��	��-���hw�^V��e��c���8�]m#(���Sa_��+<OH|�%D����S!���|����F�e����B(��</FH�a�^C������f�����o���H�6AS�];�sǼ��π����n�'[^#��w������V��x��Fݻĵ�%󥽏XT�Q�"&j�m�-�U��O���?cQ�      �   �   x�]P�N�0=O���"R�vD$ RZ��L�!�d�Dc)�����-zK	o�#�1���Dv`q�/����Q����#����j)���m0��8�D�hC����9�ړ�{�8���P7�SmrgN�
�L���df��F�g�|���
r���5�c+�QV�e	�U	V������Z~���Ǒ���rG��#�Bj��y��lӴ����O��&{���UQ�[�+      �   .  x����r!�k�z��܏�}&]��i�����&�ۇ�g��§�ٕ:pfT�M�0QGp�����@)�Pp��Ηȸ�PjHx�8U�$hiɑ�D�%��AKwd��G	%�z���^�X�*����ƥ)v�~#7l�ƍ�a#7m�p���\����VpN8sY'[�~�g\�ͩ�9Fv��5\���cu)��	mn�
�:_�0$�*��`1�2���/Rr�rڝ���e�_��셖`��~��#�Z��U����$R�X�0��vQ�7Α��	�7 t�zs0���gK��{H,��B�?�ҥ      �   �  x��W�n�H�=y
K�����ϐ6m��%j��JѤL���Yc��o�ϰ/�gl�6ҭ�b3�3��{�1����0�"/�<#�ce�C8��K�K9�!�U'�5E���:�M.�b�d/�$�ǩ&#�*W�{㌵so��G��d�N���N�Z�ԹpVŀ0�="� �@����(	p~�;�Tv�Q> Wfс���Gi~f�cQ�K�X:Q	��4�X�U���rr/�M��	�� �Pz�؟�$Y�����We�lQ��p��:I�@��Z ����!����N#�ǰG�坨�q�CMh|p/����R�A����b�L�eq� :2m{�紵������}a�lE&:-2�s�3�F�I�\��o��ߑoGY��؏�[ ���Y�Ǒ�)�"Fԥ&�2���&�h�L�ܘ���$$~'^���i4˲�� _�o�~�
q��q�%�� =�����[ �I"�.��X�����"�q�$Ε~�yݪ���4��U��a#{ܬ5��\_�à.���QOp%��t���uB��f��5�fj#��� u<�\�X&��7^��@�<T����2�)U��~P���5����:����e���=5���[:=�EL�&q/��Dp��ؑ�B�>ԩ�8� ۔/�5��mtIx�?�_q��S�!5���^D6͊y�"C�Py���wGe�v8�N0���1+��"c��2�2�-p!���g��U��YG�ME@u�R�؄����
�2��"!'��@�F�;ϲ9f/D`������%ϥRs���F��]Ve�n�����N�d�v������m�+T[��hQ*�+��ڣ�7����3�.�z��~�ŅA�xy>̊"[��Kq���ir9��>��n�i�4�ȕ:��peSV��N�V̈́�qi5���RR�]��!pX@	J��l�#��]��wz�j�������o*�D��(1�g,���ch�]L�Hj�7:,�xw'⫊���F~}��	:�'>��(�����|�0�'�	�4�
��T���}dOc1�>�WN�a�~E1������ 1Dm���8eΎ�5ֱ=+�Ex3���	�'bo^v�X<KRf��N�I�XfpiY���Z�:>A�|\rwD['�h�����q�E����c�0��8F�1K�)mf�2%��7� f�Z[w�1r�S��k뷆�Jr� >��@��j`�5�Ǿꆢ@QQ�v�ۣ,�3*��q\�q�vh)�KO4�`��H�'���B>Ƅ�:�O���\8�CЌ�mb4OX����kV�e�!��%��x��nD���^\�B�����d��������MpcM�j���mnr������	�i�T�{a�q8��a<�t����[&����X�yZ���LvI��B"��A���>}�L2;�]�����H�B��2�݇��ZM_���Ƿ�����2b�      �   �  x����n�0�k��\.� ��Ҹ1`I� ���ۇ�������3\|&93+j��}>����폇�������m�����q}�}�q?��;0�}����3H�,ηO�h6P������ ���$����ۮ~��g&ˀ�r�)ȀV]�|*�z��8�����Ǎ��<ݸ�w~nh���6u]u9��V�85�a�T:8��T+������:6-����8L�.�8LL Y�8�� P�z4�?��(�,�H�P�\\ �ܸD jKBkJ�%���L�K��T����Rw% jݵ?���]w�=�8���[G�*9	�2��)<��V��t�$�I7�j���R99Ha;�Wx�]Eԅ��0��y㦔����Պa����.�$���ˢ���S��h�X'�+I�JR���;@�<m�T��0�-VJM��cD�kX�q�Pi�ht�����Fװ@%� P[_����a=��l��B�M�5��G��Q�,�*Ľ��*��!��*����es�*�\���C��T�v՚� ������
 ��L�3N6D���B��@�ե9��=(��V��Ug�����P�����������-VML�Gh7�<�������ǍدĀU)�m������M	���)Xf���r��J���      �   �   x�Œ�
�@���)���Z����`�
.N.Q�rx���uЧ�j+���4�B��#�̜o������TTZX���y[�"D�1�"�y%�Ӳ"�ã� '"��<�a�ț5l��
���	��&�VJ���R�o���!5D�k�T��)Ǆc
�l�P�=�];kn�l��Ne<u�����'��ӟ ��d�aAp�X      �   [  x���Mn�0�5y
^���p�{�!��5�l@J�޾tEj�4���8up�L|�8$�G'�	�	��d9�р���Z*c2�@���ri�Njɗ۹�S�5-�4��[^��/�c~{�yw�
CB��5rl%A�5�1��&��t�K H��D<{���؈�Ϯ(�wӚ���-����#��4�l�����{'�!*Ļ�'�ι�'��ƛ�����!Z��-��u� } A�I�bʸ	��
�M A�.z���O�Z�N�Ǳbm˪�_��2-;Q$�Q{�E	ly�ֲq���=�r�����B��}���0��ۚ'����"-��      �   �   x�mл�0����aP�$�����Y
t�T�T.Ϗ�E9Y?���㹼0��e�n����%�����3���?۞�4�e)����i�x�h��t�Hak�c<��SzgD_I[SJ;�W��S<�V@�6��X��51��?�Cb�#��I��׃s�8@��      �   �  x�u�͑�0��"
'0*�B
b#����=���^�>|E�Ц��_֏7e�/�/�Mu�.�n�L#ir��̊vc
y��w�em�=8C(Z���'֗�{��h�q��Hx�%�J�f��l�ˤ^��p��3�"H���\Apq`P�<R�[�q.��e�pM�֛?l�˰`��4���إ��"x�+�9�$�,�cS,�%��!;݉|�G��Gh:ጭ|f��������b��cS^�e�+O#��ao$/x칕E/�#��^]#��z�9ǜ�pu�q�%b9F%��k�m��5�,��X�_U���?��TsA{j���`���Ut�����4g���kc7�^�g�ox�)	���3�=���,���j�*��N���u�a�Iߝ�~ ���      �   $  x���Mn�0���)t��ߥc'MQ�,�ɢZ�ڃR�����0v��,�,�{�7��Q<s���*z�e��?mH׍r�!i�ĺ���A�(����deD������P�cS����ZZ������>:a/���be��vX�ü����
���t��i�H����9��.���(Y��סHu�����[��ؠ-����Z�Kw\��8rť���'I]F�Ƃs�؟~�+�[���.���A]���s�9W�v'���'j�7��aA2a�����VB51k�P�ґ���1�l��$a�6�O̙�AOR<H��Nj�0,�dʪ�v�w@������M�$��4|#[1��,j�h
[��S�b*��D{�Q/�=��	�9A��Lsq�˦���8��
�O��d�Q��B�~1!�C�c|%�d�n����-�v�Ш��	Kn@������LR�+\�'~P�@��O<;Q�J������0�Uz	�cƚ3\f��Vx�k�,��.�d��4v�J��˧��{���L���`�>3?>�F�?��t�      �   �   x����JA�s�)��Lf�zu=(�[œ�T�20��t��}�f��d9���߹s!`=Ia��R%��B7��;e�Һ�H�=�	^*s2����B{J�1ĸ��6�4*�W��\ }�R���n� �_Vk-^��&��o�G�XYWk)F�|/㙄S�1�\΁h���덆��h�yd1]����y�^���Ǣi��e]�      �   T   x�M�A� D�5=��0�r����z������"��4��������ZBKh�,�˵o�p��3`�1��,��-_�GD<��0�      �   D   x�3�44��M,*IM,�t,*)-����*�S���t���I�4�44�B�D�C��������\�=... ��      �   '  x���Ak1�ϳ�"�s�L��q��Vja����e�钺&����M��� eo�����B44�}����a0 �h���h@��.����l<1��^����&��ֺH�6�� ���ͲPp�h���07�l�m;�Bq������c��l�HcL*6�}�V1�-6�t���x?�C��Y��5'r�y��i�r4g�Xf�)%[r����'�5!����ƺժVU�%O��
Q�y�q�*ؚ�_��ud f���$��p�Jc�'(�m�%�;���O��)�ڌ��֙���66eQ_<B��      �   �  x���]o�0��O~Ү�lC��I4M]��E��nN�gYq�ʘ����6���!ad��������X����*�h$&ʜ�rv���Zm��C��� K�h�8�E�tT&X���qm�t�g9�9�����_�h?\�^���!���g9�9�JB+4�u6h��6Aۓ�E����*�A&�2��C�����"!�`kv_��ż����F����SUxqI�YB�Ly�˼`c�o|��"�$���"�q��F���q�ğѯ���r�Y�<kzL����U�C��}m�|L`�A�
��YL���`ŮMDN`~ia�m������*a�Z��޿�YA1�|��ǁ�m���l����e�lij5�6�K���C���>�娑M{pV�7T5�!��;��MBR��]�9�sل��o[�X�;�&㱕�����u%�" �[�����c��G
T���k)��Nq�g'-v����d2�1��      �   	  x��Xɶ���W� ����8zb����!�� � }������Լ��U�K�:� vD�8B�����N�!��S�,�^���>�%�錷�� F7g7߰n�Yݐ�zU�5:�u�\�Ϗ� b�4�x��]W�r����_���`������� $<�-g��`��)u���Pm���لG,�����w-�G�]�b��0����AZa����$�O$�7(�8҃���8��B'���M*��3B.XiRJF�]0��Χ[����Q;��{��0'L�qtX%�tV�Wy]�W4��/8�A���y�~B�B��v�W�(0#�Q-����ξ��8>��S	_8��k2��ò5vJG����XEUiL�\�q8@|P�}3��9I�"
�'��b��g��Ti�I���?nj�d��D��Hǫj��꺿:�������t>ɰJ��oʄ�J�(�K]� �'��%��B�w�z�X�ngܖ[&?�kf�X!�>g��"i��Vk��'��R։N�7�"�0yH<�]D%_������i`�EpЦ�dv��=���P{;o"
��Ȟ��]s�*6j�B	��/]��6L�P�"t�t ��`&��n�97\�l������LV�a��Eq����<�֚����/��#��X�n1��p��D��PLi��^m��m^fn�ܘ2�Z~�M���rj�q���F�ey���IC���R�I=�y��i���Tx�wg�X8k����-�Gf�[c!�T�t�,��9���K�77q�7@� O3�&��."T$��*��Y\BTO�Q�I7���At�^��vd��f�%�l�/ E�A�+���q��u) ��}xs��.7�+gl+'��Hu�b.�adg���,Ks���ǘ<�X�R��޷'�`$Q��"*U�Dr���V=�*�d�� oj�jCC�aXL
�n��&���:oj.��9��Z%oi�($1cQ�J�s[I�i]���˥���e�n�������7�FH�Q�4��xc�!�7�ZQ)�!ҝ���>�|R�G�B��#p�pbK���-�q_H�G��uP����K���+u�&�yΔ��-����n"7�Y�ٰZZ�œ��R�Wb~[;	�Dx؆�ۆ']����@1��/UO9zXΔY=G�Ʒ�����o��֜���X��5�����o Щ�a$HD:*U _!R��p�i^Af)���l4ٲ=�k� M�w�ԯ���8�rZ{YP��c I]XV龻ih�It�H��<Le�^뗄����}���L���R.�I�&B�d�z�æx,�7�k���K'V��g�6����!@]�)�W���)��-ԧG��F�e�~��K��.����q5�Y�f�l�No��~와���8q��H���i@��B�%�ҍ�j7٢q�(8�Ny%hb��x�O}=�B߾�|�<	%���2�ϣ�H{2"/�8�b��Ы���D�jL�@�c^�L��֋0���P�����Ta�Z<�W������h�ҥ��M	@=�3�#<�]�'eߡ�>Ѡ��K{n�a~Kog�a�{ɝ��r� ֽ���C.K�c"�+��y�� � `>�� nJ�D>F�$A��.�>F�����A�+�t���]�/�h5����_e��kI�6�m�3�D��[m=I
?Z҃��u��|���Q$t�W��H`��-<X>#iF2�z��<GV/��\ؓR�d����+��T1�������K�>ZO()�v!~����:���v�����d�h�eMve�	�ꗝ	��u�g�9Qʑ9r�߻=�����lx��'Z�h��W��Ih��>���42L0ڄAdT�3S�s�9����s^����mڢ�_a�)�U0��3H��h�R�K)��u���rIrf9�.�R�nk	�C��nv�܅�>���-՟���:M�45�*����55|��bs��^ե�W��C\�(�Sh�nL�[�̳�+�b�rαv���ޱʲL�7�x�1h�!B<	y�������'x�_��R�칸g�t���e28'D=����~|�~ć$X�4�if�K-�m�o�{�A�\���cE�� �������hqL�j��]c.�@�fG��II*a|���-��e�>�\�캥[��@���܇� ���A�:<18Q
]��֛��ֳ�,��{8m���5�ԌRs�ޚBI2��е�u,�"�X��z��>�V���e19����.�vxfX`fks>R����;+#~�,Ӂ6������ݿ)>Zh�3�n���l     